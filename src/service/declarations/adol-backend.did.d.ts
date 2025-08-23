import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Address {
  'street' : string,
  'country' : string,
  'city' : string,
  'zipCode' : string,
  'state' : string,
}
export type BuyerId = Principal;
export type BuyerMatchError = { 'InvalidInput' : string } |
  { 'BuyerNotFound' : null } |
  { 'ProductNotFound' : null } |
  { 'Unauthorized' : null } |
  { 'MatchNotFound' : null } |
  { 'InsufficientData' : null } |
  { 'SellerNotFound' : null };
export interface BuyerProfile {
  'id' : BuyerId,
  'name' : string,
  'createdAt' : bigint,
  'purchaseHistory' : Array<PurchaseRecord>,
  'isActive' : boolean,
  'email' : string,
  'updatedAt' : bigint,
  'phone' : [] | [string],
  'budget' : bigint,
  'location' : [] | [Address],
}
export interface BuyerProfileInput {
  'name' : string,
  'email' : string,
  'phone' : [] | [string],
  'budget' : bigint,
  'location' : [] | [Address],
}
export interface BuyerProfileUpdate {
  'name' : [] | [string],
  'email' : [] | [string],
  'phone' : [] | [string],
  'budget' : [] | [bigint],
  'location' : [] | [Address],
}
export interface Category {
  'id' : CategoryId,
  'code' : string,
  'name' : string,
  'createdAt' : bigint,
  'description' : string,
  'isActive' : boolean,
}
export type CategoryId = bigint;
export interface CategoryInput {
  'code' : string,
  'name' : string,
  'description' : string,
}
export type HeaderField = [string, string];
export interface ICPTopUpRequest {
  'blockIndex' : [] | [bigint],
  'amount' : bigint,
}
export type InterestLevel = { 'Low' : null } |
  { 'VeryHigh' : null } |
  { 'High' : null } |
  { 'Medium' : null } |
  { 'VeryLow' : null };
export type MatchId = bigint;
export type MatchReason = { 'PopularProduct' : null } |
  { 'PriceMatch' : null } |
  { 'LocationMatch' : null } |
  { 'SimilarBuyers' : null } |
  { 'CategoryMatch' : null } |
  { 'HighRatedSeller' : null } |
  { 'PreviousPurchase' : null } |
  { 'BudgetMatch' : null } |
  { 'KeywordMatch' : null };
export interface MatchingCriteria {
  'categoryId' : [] | [CategoryId],
  'minScore' : number,
  'maxPrice' : [] | [bigint],
  'maxMatches' : bigint,
}
export interface Order {
  'id' : OrderId,
  'status' : OrderStatus,
  'completedAt' : [] | [bigint],
  'userId' : UserId,
  'createdAt' : bigint,
  'updatedAt' : bigint,
  'totalAmount' : bigint,
  'shippingAddress' : Address,
  'items' : Array<OrderItem>,
}
export type OrderError = { 'InvalidInput' : string } |
  { 'InvalidOrderStatus' : null } |
  { 'OrderNotFound' : null } |
  { 'InsufficientBalance' : null } |
  { 'ProductNotFound' : null } |
  { 'InsufficientStock' : null } |
  { 'Unauthorized' : null } |
  { 'EmptyCart' : null };
export type OrderId = bigint;
export interface OrderInput {
  'shippingAddress' : Address,
  'items' : Array<OrderItemInput>,
}
export interface OrderItem {
  'productId' : ProductId,
  'pricePerUnit' : bigint,
  'quantity' : bigint,
  'totalPrice' : bigint,
}
export interface OrderItemInput { 'productId' : ProductId, 'quantity' : bigint }
export type OrderStatus = { 'Refunded' : null } |
  { 'Delivered' : null } |
  { 'Confirmed' : null } |
  { 'Cancelled' : null } |
  { 'Processing' : null } |
  { 'Shipped' : null } |
  { 'Pending' : null };
export interface Payment {
  'id' : PaymentId,
  'status' : PaymentStatus,
  'completedAt' : [] | [bigint],
  'method' : PaymentMethod,
  'userId' : Principal,
  'createdAt' : bigint,
  'amount' : bigint,
  'transactionId' : [] | [string],
}
export type PaymentError = { 'InvalidAmount' : null } |
  { 'PaymentFailed' : string } |
  { 'Unauthorized' : null } |
  { 'InvalidBlockIndex' : null } |
  { 'PaymentNotFound' : null } |
  { 'TransferFailed' : string } |
  { 'InsufficientFunds' : null };
export type PaymentId = bigint;
export type PaymentMethod = { 'ICP' : null } |
  { 'TopUp' : null };
export type PaymentStatus = { 'Failed' : null } |
  { 'Refunded' : null } |
  { 'Completed' : null } |
  { 'Pending' : null };
export interface PotentialMatch {
  'id' : MatchId,
  'isViewed' : boolean,
  'createdAt' : bigint,
  'productId' : ProductId,
  'matchScore' : number,
  'recommendedAction' : RecommendedAction,
  'matchReasons' : Array<MatchReason>,
  'buyerId' : BuyerId,
  'isInterested' : [] | [boolean],
  'sellerId' : SellerId,
  'estimatedInterest' : InterestLevel,
}
export interface Product {
  'id' : ProductId,
  'categoryId' : CategoryId,
  'keySellingPoints' : Array<string>,
  'name' : string,
  'createdAt' : bigint,
  'createdBy' : Principal,
  'minimumPrice' : [] | [bigint],
  'reasonForSelling' : string,
  'targetPrice' : [] | [bigint],
  'description' : string,
  'isActive' : boolean,
  'updatedAt' : bigint,
  'stock' : bigint,
  'imageUrl' : [] | [string],
  'pickupDeliveryInfo' : string,
  'knownFlaws' : string,
  'price' : bigint,
  'condition' : string,
}
export type ProductError = { 'InvalidInput' : string } |
  { 'CategoryNotFound' : null } |
  { 'ProductNotFound' : null } |
  { 'InsufficientStock' : null } |
  { 'Unauthorized' : null };
export type ProductId = string;
export interface ProductInput {
  'categoryId' : CategoryId,
  'keySellingPoints' : Array<string>,
  'name' : string,
  'minimumPrice' : [] | [bigint],
  'reasonForSelling' : string,
  'targetPrice' : [] | [bigint],
  'description' : string,
  'stock' : bigint,
  'imageUrl' : [] | [string],
  'pickupDeliveryInfo' : string,
  'knownFlaws' : string,
  'price' : bigint,
  'condition' : string,
}
export interface ProductUpdate {
  'categoryId' : [] | [CategoryId],
  'keySellingPoints' : [] | [Array<string>],
  'name' : [] | [string],
  'minimumPrice' : [] | [bigint],
  'reasonForSelling' : [] | [string],
  'targetPrice' : [] | [bigint],
  'description' : [] | [string],
  'isActive' : [] | [boolean],
  'stock' : [] | [bigint],
  'imageUrl' : [] | [string],
  'pickupDeliveryInfo' : [] | [string],
  'knownFlaws' : [] | [string],
  'price' : [] | [bigint],
  'condition' : [] | [string],
}
export interface PurchaseRecord {
  'purchaseDate' : bigint,
  'productId' : ProductId,
  'sellerId' : SellerId,
  'rating' : [] | [bigint],
  'amount' : bigint,
}
export type RecommendedAction = { 'ImmediateContact' : null } |
  { 'SpecialOffer' : null } |
  { 'WatchAndWait' : null } |
  { 'PriceAlert' : null } |
  { 'SendSample' : null };
export interface Request {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
}
export interface Response {
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export type Result = { 'ok' : SellerProfile } |
  { 'err' : BuyerMatchError };
export type Result_1 = { 'ok' : User } |
  { 'err' : UserError };
export type Result_2 = { 'ok' : Product } |
  { 'err' : ProductError };
export type Result_3 = { 'ok' : Order } |
  { 'err' : OrderError };
export type Result_4 = { 'ok' : BuyerProfile } |
  { 'err' : BuyerMatchError };
export type Result_5 = { 'ok' : Payment } |
  { 'err' : PaymentError };
export type Result_6 = { 'ok' : PotentialMatch } |
  { 'err' : BuyerMatchError };
export type Result_7 = { 'ok' : bigint } |
  { 'err' : UserError };
export type Result_8 = { 'ok' : Array<PotentialMatch> } |
  { 'err' : BuyerMatchError };
export type SellerId = Principal;
export interface SellerProfile {
  'id' : SellerId,
  'createdAt' : bigint,
  'businessName' : string,
  'description' : string,
  'totalSales' : bigint,
  'isVerified' : boolean,
  'contactEmail' : string,
  'rating' : number,
  'location' : [] | [Address],
  'contactPhone' : [] | [string],
}
export interface SellerProfileInput {
  'businessName' : string,
  'description' : string,
  'contactEmail' : string,
  'location' : [] | [Address],
  'contactPhone' : [] | [string],
}
export interface SellerProfileUpdate {
  'businessName' : [] | [string],
  'description' : [] | [string],
  'contactEmail' : [] | [string],
  'location' : [] | [Address],
  'contactPhone' : [] | [string],
}
export type StreamingCallback = ActorMethod<
  [StreamingToken],
  [] | [StreamingCallbackResponse]
>;
export interface StreamingCallbackResponse {
  'token' : [] | [StreamingToken],
  'body' : Uint8Array | number[],
}
export type StreamingStrategy = {
    'Callback' : { 'token' : StreamingToken, 'callback' : StreamingCallback }
  };
export interface StreamingToken { 'arbitrary_data' : string }
export interface TopUpRequest { 'amount' : bigint }
export interface User {
  'id' : UserId,
  'name' : string,
  'createdAt' : bigint,
  'icpBalance' : bigint,
  'isActive' : boolean,
  'email' : string,
  'updatedAt' : bigint,
  'address' : [] | [Address],
  'phone' : [] | [string],
}
export type UserError = { 'UserAlreadyExists' : null } |
  { 'InvalidInput' : string } |
  { 'Unauthorized' : null } |
  { 'InvalidEmail' : null } |
  { 'UserNotFound' : null };
export type UserId = Principal;
export interface UserRegistration {
  'name' : string,
  'email' : string,
  'address' : [] | [Address],
  'phone' : [] | [string],
}
export interface UserUpdate {
  'name' : [] | [string],
  'address' : [] | [Address],
  'phone' : [] | [string],
}
export interface _SERVICE {
  'addPurchaseRecord' : ActorMethod<[PurchaseRecord], Result_4>,
  'cancelOrder' : ActorMethod<[OrderId], Result_3>,
  'createBuyerProfile' : ActorMethod<[BuyerProfileInput], BuyerProfile>,
  'createCategory' : ActorMethod<[CategoryInput], Category>,
  'createOrder' : ActorMethod<[OrderInput], Result_3>,
  'createProduct' : ActorMethod<[ProductInput], Result_2>,
  'createSellerProfile' : ActorMethod<[SellerProfileInput], SellerProfile>,
  'findPotentialMatches' : ActorMethod<[MatchingCriteria], Result_8>,
  'getAllBuyerProfiles' : ActorMethod<[], Array<BuyerProfile>>,
  'getAllMatches' : ActorMethod<[], Array<PotentialMatch>>,
  'getAllOrders' : ActorMethod<[], Array<Order>>,
  'getAllPayments' : ActorMethod<[], Array<Payment>>,
  'getAllProducts' : ActorMethod<[], Array<Product>>,
  'getAllSellerProfiles' : ActorMethod<[], Array<SellerProfile>>,
  'getAllUsers' : ActorMethod<[], Array<User>>,
  'getBalance' : ActorMethod<[], Result_7>,
  'getBuyerProfile' : ActorMethod<[], Result_4>,
  'getBuyerProfileById' : ActorMethod<[BuyerId], Result_4>,
  'getCategories' : ActorMethod<[], Array<Category>>,
  'getInfo' : ActorMethod<
    [],
    {
      'name' : string,
      'description' : string,
      'version' : string,
      'timestamp' : bigint,
    }
  >,
  'getMatchesForSeller' : ActorMethod<[], Array<PotentialMatch>>,
  'getMyDepositInfo' : ActorMethod<
    [],
    {
      'instructions' : string,
      'userSubaccount' : string,
      'platformAccount' : Principal,
    }
  >,
  'getMyMatches' : ActorMethod<[], Array<PotentialMatch>>,
  'getMyOrders' : ActorMethod<[], Array<Order>>,
  'getMyPayments' : ActorMethod<[], Array<Payment>>,
  'getOrder' : ActorMethod<[OrderId], Result_3>,
  'getOrdersByStatus' : ActorMethod<[OrderStatus], Array<Order>>,
  'getOwnerICPAccount' : ActorMethod<
    [],
    {
      'principal' : string,
      'instructions' : string,
      'minimumAmount' : bigint,
      'account' : string,
    }
  >,
  'getPayment' : ActorMethod<[PaymentId], Result_5>,
  'getPaymentConfig' : ActorMethod<
    [],
    {
      'minimumAmount' : bigint,
      'simulationMode' : boolean,
      'platformAccount' : Principal,
    }
  >,
  'getProduct' : ActorMethod<[ProductId], Result_2>,
  'getProducts' : ActorMethod<[], Array<Product>>,
  'getProductsByCategory' : ActorMethod<[CategoryId], Array<Product>>,
  'getProfile' : ActorMethod<[], Result_1>,
  'getSellerProfile' : ActorMethod<[], Result>,
  'getSellerProfileById' : ActorMethod<[SellerId], Result>,
  'health' : ActorMethod<[], { 'status' : string, 'timestamp' : bigint }>,
  'http_request' : ActorMethod<[Request], Response>,
  'http_request_update' : ActorMethod<[Request], Response>,
  'markMatchAsViewed' : ActorMethod<[bigint], Result_6>,
  'registerUser' : ActorMethod<[UserRegistration], Result_1>,
  'setMatchInterest' : ActorMethod<[bigint, boolean], Result_6>,
  'topUpBalance' : ActorMethod<[TopUpRequest], Result_5>,
  'topUpBalanceWithICP' : ActorMethod<[ICPTopUpRequest], Result_5>,
  'updateBuyerProfile' : ActorMethod<[BuyerProfileUpdate], Result_4>,
  'updateOrderStatus' : ActorMethod<[OrderId, OrderStatus], Result_3>,
  'updateProduct' : ActorMethod<[ProductId, ProductUpdate], Result_2>,
  'updateProfile' : ActorMethod<[UserUpdate], Result_1>,
  'updateSellerProfile' : ActorMethod<[SellerProfileUpdate], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
