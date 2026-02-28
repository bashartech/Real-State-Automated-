import os
import httpx
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Sanity configuration
SANITY_PROJECT_ID = os.getenv("SANITY_PROJECT_ID")
SANITY_DATASET = os.getenv("SANITY_DATASET")
SANITY_TOKEN = os.getenv("SANITY_TOKEN")
SANITY_API_VERSION = os.getenv("SANITY_API_VERSION", "2024-02-28")

# Sanity API endpoints
QUERY_URL = f"https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}/data/query/{SANITY_DATASET}"
MUTATE_URL = f"https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}/data/mutate/{SANITY_DATASET}"

def _query_sanity(groq_query: str):
    """Execute a GROQ query against Sanity"""
    try:
        with httpx.Client() as client:
            response = client.get(
                QUERY_URL,
                params={"query": groq_query},
                headers={"Authorization": f"Bearer {SANITY_TOKEN}"},
                timeout=10.0
            )
            response.raise_for_status()
            return response.json().get("result", [])
    except Exception as e:
        print(f"Error querying Sanity: {e}")
        return []

def _mutate_sanity(mutations: dict):
    """Execute a mutation against Sanity"""
    try:
        with httpx.Client() as client:
            response = client.post(
                MUTATE_URL,
                json=mutations,
                headers={
                    "Authorization": f"Bearer {SANITY_TOKEN}",
                    "Content-Type": "application/json"
                },
                timeout=10.0
            )
            response.raise_for_status()
            result = response.json()
            return {"success": True, "data": result}
    except Exception as e:
        print(f"Error mutating Sanity: {e}")
        return {"success": False, "error": str(e)}

def search_properties(query: str = None, property_type: str = None, min_price: int = None, max_price: int = None):
    """Search properties in Sanity database with filters"""

    # Build GROQ query
    filters = ['_type == "property"']

    if property_type:
        filters.append(f'type == "{property_type}"')

    if min_price:
        filters.append(f'price >= {min_price}')

    if max_price:
        filters.append(f'price <= {max_price}')

    groq_query = f'*[{" && ".join(filters)}] | order(_createdAt desc) [0...10]'

    return _query_sanity(groq_query)

def get_property_by_id(property_id: str):
    """Get a specific property by ID"""
    groq_query = f'*[_type == "property" && _id == "{property_id}"][0]'

    result = _query_sanity(groq_query)
    return result[0] if result else None

def save_lead(name: str, email: str, phone: str, message: str):
    """Save a new lead to Sanity"""
    mutations = {
        "mutations": [
            {
                "create": {
                    "_type": "lead",
                    "name": name,
                    "email": email,
                    "phone": phone,
                    "message": message,
                    "source": "AI Chatbot",
                    "submittedAt": datetime.utcnow().isoformat() + "Z"
                }
            }
        ]
    }

    result = _mutate_sanity(mutations)
    if result.get("success"):
        return {"success": True, "id": result.get("data", {}).get("results", [{}])[0].get("id")}
    return result

def save_property_inquiry(property_id: str, name: str, email: str, phone: str, message: str):
    """Save a property inquiry to Sanity"""
    mutations = {
        "mutations": [
            {
                "create": {
                    "_type": "propertyInquiry",
                    "property": {
                        "_type": "reference",
                        "_ref": property_id
                    },
                    "name": name,
                    "email": email,
                    "phone": phone,
                    "message": message,
                    "submittedAt": datetime.utcnow().isoformat() + "Z"
                }
            }
        ]
    }

    result = _mutate_sanity(mutations)
    if result.get("success"):
        return {"success": True, "id": result.get("data", {}).get("results", [{}])[0].get("id")}
    return result

def get_all_property_types():
    """Get all unique property types"""
    groq_query = '*[_type == "property"] { type }'

    properties = _query_sanity(groq_query)
    types = list(set([p.get('type') for p in properties if p.get('type')]))
    return types
