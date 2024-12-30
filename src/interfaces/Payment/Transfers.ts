// Define the TypeScript interface for the Transfers model
export interface Transfers {
  _id: string; // TypeScript equivalent for private String _id in Java using @Id annotation
  receiverId: string; // Corresponds to the @NotNull private String receiverId in Java
  senderId: string; // Corresponds to the @NotNull private String senderId in Java
  transferId: string; // Corresponds to the @NotNull private String transferId in Java
  quoteId: string; // Corresponds to the @NotNull private String quoteId in Java
  sourceCurrency: string; // Corresponds to the @NotNull private String sourceCurrency in Java
  targetCurrency: string; // Corresponds to the @NotNull private String targetCurrency in Java
  sourceAmount: number; // Maps Java's Double to TypeScript's number
  targetAmount: number; // Maps Java's float to TypeScript's number, both are represented as number in TypeScript
  didBuyerPay: boolean; // Corresponds to the boolean with a @Builder Default in Java
}
