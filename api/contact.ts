const SERVICE_LABELS: Record<string, string> = {
  "web-design": "Website Design & Development",
  "hosting": "Hosting & Maintenance Plan",
  "seo": "Local SEO Optimization",
  "general": "General Inquiry",
};

const BASE_ID = "app9xBW2dfdX8EvV2";
const TABLE_ID = "tblZjZPGRjGPiCiiJ";

const FIELDS = {
  fullName: "fld21zFBKcXVm99Ne",
  email: "fldto4YNGY5bLhqrm",
  company: "fldW1JhI79mosxP25",
  service: "fldEhtk9JLu0bKg8g",
  message: "fldpRyfrLnP7diFoI",
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullName, email, company, service, message } = req.body;

  if (!fullName || !email || !service || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const token = process.env.AIRTABLE_API_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const airtableRes = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              [FIELDS.fullName]: fullName,
              [FIELDS.email]: email,
              [FIELDS.company]: company || "",
              [FIELDS.service]: SERVICE_LABELS[service] || service,
              [FIELDS.message]: message,
            },
          },
        ],
      }),
    }
  );

  if (!airtableRes.ok) {
    const error = await airtableRes.text();
    console.error("Airtable error:", error);
    return res.status(500).json({ error: "Failed to save submission" });
  }

  return res.status(200).json({ success: true });
}
