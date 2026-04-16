import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food Delivery API",
      version: "1.0.0",
      description: "API documentation for Food Delivery App",
      contact: {
        name: "Winfred Nukpezah",
        email: "winfrednukpe2002@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Food: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            category: { type: "string" },
            image: { type: "string" },
          },
        },
        NewFood: {
          type: "object",
          required: ["name", "description", "price", "category"],
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            category: { type: "string" },
            image: { type: "string", format: "binary" },
          },
        },
        UserCredentials: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },
        NewUser: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
            user: { type: "object" },
            token: { type: "string" },
          },
        },
        CartRequest: {
          type: "object",
          required: ["itemId"],
          properties: {
            itemId: { type: "string" },
          },
        },
        OrderItem: {
          type: "object",
          required: ["name", "price"],
          properties: {
            name: { type: "string" },
            price: { type: "number" },
            quantity: { type: "integer", default: 1 },
          },
        },
        OrderAddress: {
          type: "object",
          properties: {
            street: { type: "string" },
            city: { type: "string" },
            postalCode: { type: "string" },
            country: { type: "string" },
          },
        },
        NewOrder: {
          type: "object",
          required: ["items", "totalAmount", "address", "email"],
          properties: {
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItem" },
            },
            totalAmount: { type: "number" },
            address: { $ref: "#/components/schemas/OrderAddress" },
            deliveryFee: { type: "number", default: 2 },
            email: { type: "string", format: "email" },
          },
        },
        VerifyOrderRequest: {
          type: "object",
          required: ["success", "orderId"],
          properties: {
            success: {
              type: "string",
              description:
                "Payment verification status, typically true or false as a string",
            },
            orderId: { type: "string" },
          },
        },
        OrderStatusRequest: {
          type: "object",
          required: ["orderId", "status"],
          properties: {
            orderId: { type: "string" },
            status: { type: "string" },
          },
        },
        RetryPaymentRequest: {
          type: "object",
          required: ["orderId"],
          properties: {
            orderId: { type: "string" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
