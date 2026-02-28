import os
from dotenv import load_dotenv
from openai import AsyncOpenAI
from agents import Agent, function_tool, set_default_openai_client, set_default_openai_api, set_tracing_disabled
from sanity_client import search_properties, get_property_by_id, save_lead, save_property_inquiry, get_all_property_types

load_dotenv()

# Initialize OpenAI client with Gemini API
gemini_api_key = os.getenv("GEMINI_API_KEY")
gemini_model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
gemini_base_url = os.getenv("GEMINI_BASE_URL")

if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY is not set. Please add it to your .env file.")

# Configure AsyncOpenAI client to use Gemini
client = AsyncOpenAI(
    api_key=gemini_api_key,
    base_url=gemini_base_url
)

set_default_openai_client(client)
set_default_openai_api("chat_completions")
set_tracing_disabled(True)

# Define function tools for the agent

@function_tool
def search_real_estate_properties(
    property_type: str = None,
    min_price: int = None,
    max_price: int = None
) -> dict:
    """
    Search for real estate properties based on filters.

    Args:
        property_type: Type of property (e.g., "House", "Apartment", "Condo", "Land")
        min_price: Minimum price in dollars
        max_price: Maximum price in dollars

    Returns:
        List of matching properties with details
    """
    print(f"Searching properties: type={property_type}, min={min_price}, max={max_price}")

    properties = search_properties(
        property_type=property_type,
        min_price=min_price,
        max_price=max_price
    )

    if not properties:
        return {
            "success": True,
            "count": 0,
            "message": "No properties found matching your criteria.",
            "properties": []
        }

    # Format properties for response
    formatted_properties = []
    for prop in properties[:5]:  # Limit to 5 results
        formatted_properties.append({
            "id": prop.get("_id"),
            "title": prop.get("title"),
            "price": prop.get("price"),
            "location": f"{prop.get('city', '')}, {prop.get('state', '')}".strip(', '),
            "bedrooms": prop.get("beds"),
            "bathrooms": prop.get("baths"),
            "area": prop.get("sqft"),
            "propertyType": prop.get("type"),
            "description": prop.get("description", "")[:200]  # Truncate description
        })

    return {
        "success": True,
        "count": len(formatted_properties),
        "properties": formatted_properties
    }

@function_tool
def get_property_details(property_id: str) -> dict:
    """
    Get detailed information about a specific property.

    Args:
        property_id: The unique ID of the property

    Returns:
        Detailed property information
    """
    print(f"Fetching property details: {property_id}")

    property_data = get_property_by_id(property_id)

    if not property_data:
        return {
            "success": False,
            "message": "Property not found."
        }

    return {
        "success": True,
        "property": {
            "id": property_data.get("_id"),
            "title": property_data.get("title"),
            "price": property_data.get("price"),
            "location": f"{property_data.get('city', '')}, {property_data.get('state', '')}".strip(', '),
            "bedrooms": property_data.get("beds"),
            "bathrooms": property_data.get("baths"),
            "area": property_data.get("sqft"),
            "propertyType": property_data.get("type"),
            "description": property_data.get("description"),
            "address": property_data.get("address"),
            "yearBuilt": property_data.get("yearBuilt"),
            "status": property_data.get("status")
        }
    }

@function_tool
def save_user_lead(name: str, email: str, phone: str, message: str) -> dict:
    """
    Save a user's contact information and inquiry as a lead.

    Args:
        name: User's full name
        email: User's email address
        phone: User's phone number
        message: User's message or inquiry

    Returns:
        Confirmation of lead saved
    """
    print(f"Saving lead: {name} - {email}")

    result = save_lead(name, email, phone, message)

    if result.get("success"):
        return {
            "success": True,
            "message": "Thank you! Your information has been saved. Our team will contact you shortly."
        }
    else:
        return {
            "success": False,
            "message": "Sorry, there was an error saving your information. Please try again."
        }

@function_tool
def inquire_about_property(
    property_id: str,
    name: str,
    email: str,
    phone: str,
    message: str
) -> dict:
    """
    Save an inquiry about a specific property.

    Args:
        property_id: The ID of the property being inquired about
        name: User's full name
        email: User's email address
        phone: User's phone number
        message: User's inquiry message

    Returns:
        Confirmation of inquiry saved
    """
    print(f"Saving property inquiry: {property_id} - {name}")

    result = save_property_inquiry(property_id, name, email, phone, message)

    if result.get("success"):
        return {
            "success": True,
            "message": "Your inquiry has been submitted! Our team will get back to you soon with more details about this property."
        }
    else:
        return {
            "success": False,
            "message": "Sorry, there was an error submitting your inquiry. Please try again."
        }

@function_tool
def get_available_property_types() -> dict:
    """
    Get all available property types in the database.

    Returns:
        List of property types
    """
    print("Fetching property types")

    types = get_all_property_types()

    return {
        "success": True,
        "property_types": types
    }

# Create the AI agent
real_estate_agent = Agent(
    name="ScottJ_RealEstateBot",
    instructions="""
    You are a professional real estate assistant for Scott J. Realtor Group of Option One Real Estate.

    Your role is to:
    1. Help users find properties that match their needs
    2. Provide detailed information about properties
    3. Answer questions about buying, selling, and real estate in general
    4. Collect user information for follow-up (name, email, phone)
    5. Schedule consultations and property viewings

    Guidelines:
    - Be professional, friendly, and helpful
    - REMEMBER previous messages in the conversation - users may refine their search criteria
    - If a user mentions preferences earlier, remember them (e.g., budget, bedrooms, location)
    - Ask clarifying questions to understand user needs
    - Use the search tools to find relevant properties
    - When users show interest, collect their contact information
    - Provide accurate information based on property data
    - If you don't know something, be honest and offer to connect them with an agent
    - Always mention Scott J. Realtor Group when introducing yourself

    When searching for properties:
    - Pay attention to previous search criteria mentioned in the conversation
    - If user says "under $500k" then later says "with 3 bedrooms", search for properties under $500k with 3 bedrooms
    - Ask about budget range, property type, location preferences if not mentioned
    - Present results clearly with key details
    - Offer to provide more details about specific properties

    When collecting leads:
    - Be natural and conversational
    - Explain why you need their information (to follow up, schedule viewing, etc.)
    - Thank them after collecting information

    IMPORTANT: Use conversation context to provide better assistance. If the user refines their search,
    apply all criteria mentioned throughout the conversation.
    """,
    tools=[
        search_real_estate_properties,
        get_property_details,
        save_user_lead,
        inquire_about_property,
        get_available_property_types
    ],
    model="gemini-2.5-flash"
)
