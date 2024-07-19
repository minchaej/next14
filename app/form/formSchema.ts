// formSchema.js

export const schema = {
    type: "object",
    properties: {
      firstName: { type: "string", minLength: 1, description: "First Name" },
      lastName: { type: "string", minLength: 1, description: "Last Name" },
      email: { type: "string", format: "email", description: "Email Address" },
      linkedin: { type: "string", format: "uri", description: "LinkedIn Profile URL" },
      visasInterested: { type: "string", description: "Visas You're Interested In" },
      resume: { type: "string", format: "data-url", description: "Resume/CV" },
      openInput: { type: "string", description: "Open Long Input" }
    },
    required: ["firstName", "lastName", "email", "linkedin", "visasInterested", "resume", "openInput"]
  };
  
  export const uischema = {
    type: "VerticalLayout",
    elements: [
      { type: "Control", scope: "#/properties/firstName" },
      { type: "Control", scope: "#/properties/lastName" },
      { type: "Control", scope: "#/properties/email" },
      { type: "Control", scope: "#/properties/linkedin" },
      { type: "Control", scope: "#/properties/visasInterested" },
      { type: "Control", scope: "#/properties/resume" },
      { type: "Control", scope: "#/properties/openInput", options: { multiLine: true } }
    ]
  };
  