🚀 Complete Step-by-Step Setup of Sanity in Next.js Project
✅ Step 1 — Install Sanity CLI Globally

Open PowerShell / Terminal:

npm install -g @sanity/cli

Check version:

sanity --version
✅ Step 2 — Create Sanity Studio (Inside Your Project)

Go to your project root folder:

cd your-project-name

Now run:

npm create sanity@latest

It will ask:

Project name → choose any (example: real-estate-cms)

Dataset → production

Project output path →
👉 Type: ./sanity
(This creates a separate folder inside your project)

Use TypeScript? → Yes

Use default schema? → Yes (you can modify later)

After installation:

your-project/
 ├── app/
 ├── components/
 ├── sanity/   👈 CMS studio
✅ Step 3 — Start Sanity Studio
cd sanity
npm run dev

Open:

http://localhost:3333

You’ll log in and see Sanity dashboard.

🧱 Step 4 — Create Schemas (For Real Estate Website)

Now we create content types like:

Properties

Agents

Blog Posts

Testimonials

Go to:

sanity/schemaTypes/

Create a new file:

📄 property.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Property Title",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Property Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});

Then register it inside:

schemaTypes/index.ts
import property from "./property";

export const schemaTypes = [property];

Restart Sanity:

npm run dev

Now you’ll see Property in the dashboard.

🔗 Step 5 — Connect Sanity to Next.js

Go back to your main project root:

cd ..

Install required packages:

npm install @sanity/client @sanity/image-url next-sanity
✅ Step 6 — Create Sanity Client

Create folder:

lib/sanity.ts
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "YOUR_PROJECT_ID",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

👉 Get projectId from:

Sanity Dashboard → Settings → API

🔎 Step 7 — Fetch Data in Next.js

Example: Fetch properties in homepage.

import { client } from "@/lib/sanity";

export default async function Home() {
  const properties = await client.fetch(
    `*[_type == "property"]{
      title,
      price,
      location
    }`
  );

  return (
    <div>
      {properties.map((item: any) => (
        <div key={item.title}>
          <h2>{item.title}</h2>
          <p>${item.price}</p>
          <p>{item.location}</p>
        </div>
      ))}
    </div>
  );
}
🖼 Step 8 — Load Images Properly

Add image helper:

import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity";

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

Use it:

<img src={urlFor(item.image).url()} />
🚀 Step 9 — Deploy Sanity Studio

Inside /sanity folder:

sanity deploy

It gives you:

https://your-project-name.sanity.studio

Now your CMS is live.

🎯 How You Would Use This in Your Real Estate Website

You can manage dynamically:

🏠 Properties

Add/edit listings without coding.

👨‍💼 Agents

Manage team profiles.

📝 Blog Posts

SEO articles editable from CMS.

⭐ Testimonials

Client reviews managed easily.

🔥 Best Structure For Your Project
/app
/components
/lib
/sanity

Sanity = content management
Next.js = frontend
Perfect headless architecture.

⚡ Pro Tips (Important for You)

Since you're using:

Next.js

TypeScript

Tailwind

You should also install:

npm install @portabletext/react

For rendering rich text blog content.