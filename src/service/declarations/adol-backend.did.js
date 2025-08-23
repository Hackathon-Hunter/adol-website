export const idlFactory = ({ IDL }) => {
  const ProductId = IDL.Text;
  const SellerId = IDL.Principal;
  const PurchaseRecord = IDL.Record({
    'purchaseDate' : IDL.Int,
    'productId' : ProductId,
    'sellerId' : SellerId,
    'rating' : IDL.Opt(IDL.Nat),
    'amount' : IDL.Nat,
  });
  const BuyerId = IDL.Principal;
  const Address = IDL.Record({
    'street' : IDL.Text,
    'country' : IDL.Text,
    'city' : IDL.Text,
    'zipCode' : IDL.Text,
    'state' : IDL.Text,
  });
  const BuyerProfile = IDL.Record({
    'id' : BuyerId,
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'purchaseHistory' : IDL.Vec(PurchaseRecord),
    'isActive' : IDL.Bool,
    'email' : IDL.Text,
    'updatedAt' : IDL.Int,
    'phone' : IDL.Opt(IDL.Text),
    'budget' : IDL.Nat,
    'location' : IDL.Opt(Address),
  });
  const BuyerMatchError = IDL.Variant({
    'InvalidInput' : IDL.Text,
    'BuyerNotFound' : IDL.Null,
    'ProductNotFound' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'MatchNotFound' : IDL.Null,
    'InsufficientData' : IDL.Null,
    'SellerNotFound' : IDL.Null,
  });
  const Result_4 = IDL.Variant({
    'ok' : BuyerProfile,
    'err' : BuyerMatchError,
  });
  const OrderId = IDL.Nat;
  const OrderStatus = IDL.Variant({
    'Refunded' : IDL.Null,
    'Delivered' : IDL.Null,
    'Confirmed' : IDL.Null,
    'Cancelled' : IDL.Null,
    'Processing' : IDL.Null,
    'Shipped' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const UserId = IDL.Principal;
  const OrderItem = IDL.Record({
    'productId' : ProductId,
    'pricePerUnit' : IDL.Nat,
    'quantity' : IDL.Nat,
    'totalPrice' : IDL.Nat,
  });
  const Order = IDL.Record({
    'id' : OrderId,
    'status' : OrderStatus,
    'completedAt' : IDL.Opt(IDL.Int),
    'userId' : UserId,
    'createdAt' : IDL.Int,
    'updatedAt' : IDL.Int,
    'totalAmount' : IDL.Nat,
    'shippingAddress' : Address,
    'items' : IDL.Vec(OrderItem),
  });
  const OrderError = IDL.Variant({
    'InvalidInput' : IDL.Text,
    'InvalidOrderStatus' : IDL.Null,
    'OrderNotFound' : IDL.Null,
    'InsufficientBalance' : IDL.Null,
    'ProductNotFound' : IDL.Null,
    'InsufficientStock' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'EmptyCart' : IDL.Null,
  });
  const Result_3 = IDL.Variant({ 'ok' : Order, 'err' : OrderError });
  const BuyerProfileInput = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'phone' : IDL.Opt(IDL.Text),
    'budget' : IDL.Nat,
    'location' : IDL.Opt(Address),
  });
  const CategoryInput = IDL.Record({
    'code' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
  });
  const CategoryId = IDL.Nat;
  const Category = IDL.Record({
    'id' : CategoryId,
    'code' : IDL.Text,
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'description' : IDL.Text,
    'isActive' : IDL.Bool,
  });
  const OrderItemInput = IDL.Record({
    'productId' : ProductId,
    'quantity' : IDL.Nat,
  });
  const OrderInput = IDL.Record({
    'shippingAddress' : Address,
    'items' : IDL.Vec(OrderItemInput),
  });
  const ProductInput = IDL.Record({
    'categoryId' : CategoryId,
    'keySellingPoints' : IDL.Vec(IDL.Text),
    'name' : IDL.Text,
    'minimumPrice' : IDL.Opt(IDL.Nat),
    'reasonForSelling' : IDL.Text,
    'targetPrice' : IDL.Opt(IDL.Nat),
    'description' : IDL.Text,
    'stock' : IDL.Nat,
    'imageBase64' : IDL.Opt(IDL.Text),
    'pickupDeliveryInfo' : IDL.Text,
    'knownFlaws' : IDL.Text,
    'price' : IDL.Nat,
    'condition' : IDL.Text,
  });
  const Product = IDL.Record({
    'id' : ProductId,
    'categoryId' : CategoryId,
    'keySellingPoints' : IDL.Vec(IDL.Text),
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'createdBy' : IDL.Principal,
    'minimumPrice' : IDL.Opt(IDL.Nat),
    'reasonForSelling' : IDL.Text,
    'targetPrice' : IDL.Opt(IDL.Nat),
    'description' : IDL.Text,
    'isActive' : IDL.Bool,
    'updatedAt' : IDL.Int,
    'stock' : IDL.Nat,
    'imageBase64' : IDL.Opt(IDL.Text),
    'pickupDeliveryInfo' : IDL.Text,
    'knownFlaws' : IDL.Text,
    'price' : IDL.Nat,
    'condition' : IDL.Text,
  });
  const ProductError = IDL.Variant({
    'InvalidInput' : IDL.Text,
    'CategoryNotFound' : IDL.Null,
    'ProductNotFound' : IDL.Null,
    'InsufficientStock' : IDL.Null,
    'Unauthorized' : IDL.Null,
  });
  const Result_2 = IDL.Variant({ 'ok' : Product, 'err' : ProductError });
  const SellerProfileInput = IDL.Record({
    'businessName' : IDL.Text,
    'description' : IDL.Text,
    'contactEmail' : IDL.Text,
    'location' : IDL.Opt(Address),
    'contactPhone' : IDL.Opt(IDL.Text),
  });
  const SellerProfile = IDL.Record({
    'id' : SellerId,
    'createdAt' : IDL.Int,
    'businessName' : IDL.Text,
    'description' : IDL.Text,
    'totalSales' : IDL.Nat,
    'isVerified' : IDL.Bool,
    'contactEmail' : IDL.Text,
    'rating' : IDL.Float64,
    'location' : IDL.Opt(Address),
    'contactPhone' : IDL.Opt(IDL.Text),
  });
  const MatchingCriteria = IDL.Record({
    'categoryId' : IDL.Opt(CategoryId),
    'minScore' : IDL.Float64,
    'maxPrice' : IDL.Opt(IDL.Nat),
    'maxMatches' : IDL.Nat,
  });
  const MatchId = IDL.Nat;
  const RecommendedAction = IDL.Variant({
    'ImmediateContact' : IDL.Null,
    'SpecialOffer' : IDL.Null,
    'WatchAndWait' : IDL.Null,
    'PriceAlert' : IDL.Null,
    'SendSample' : IDL.Null,
  });
  const MatchReason = IDL.Variant({
    'PopularProduct' : IDL.Null,
    'PriceMatch' : IDL.Null,
    'LocationMatch' : IDL.Null,
    'SimilarBuyers' : IDL.Null,
    'CategoryMatch' : IDL.Null,
    'HighRatedSeller' : IDL.Null,
    'PreviousPurchase' : IDL.Null,
    'BudgetMatch' : IDL.Null,
    'KeywordMatch' : IDL.Null,
  });
  const InterestLevel = IDL.Variant({
    'Low' : IDL.Null,
    'VeryHigh' : IDL.Null,
    'High' : IDL.Null,
    'Medium' : IDL.Null,
    'VeryLow' : IDL.Null,
  });
  const PotentialMatch = IDL.Record({
    'id' : MatchId,
    'isViewed' : IDL.Bool,
    'createdAt' : IDL.Int,
    'productId' : ProductId,
    'matchScore' : IDL.Float64,
    'recommendedAction' : RecommendedAction,
    'matchReasons' : IDL.Vec(MatchReason),
    'buyerId' : BuyerId,
    'isInterested' : IDL.Opt(IDL.Bool),
    'sellerId' : SellerId,
    'estimatedInterest' : InterestLevel,
  });
  const Result_8 = IDL.Variant({
    'ok' : IDL.Vec(PotentialMatch),
    'err' : BuyerMatchError,
  });
  const PaymentId = IDL.Nat;
  const PaymentStatus = IDL.Variant({
    'Failed' : IDL.Null,
    'Refunded' : IDL.Null,
    'Completed' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const PaymentMethod = IDL.Variant({ 'ICP' : IDL.Null, 'TopUp' : IDL.Null });
  const Payment = IDL.Record({
    'id' : PaymentId,
    'status' : PaymentStatus,
    'completedAt' : IDL.Opt(IDL.Int),
    'method' : PaymentMethod,
    'userId' : IDL.Principal,
    'createdAt' : IDL.Int,
    'amount' : IDL.Nat,
    'transactionId' : IDL.Opt(IDL.Text),
  });
  const User = IDL.Record({
    'id' : UserId,
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'icpBalance' : IDL.Nat,
    'isActive' : IDL.Bool,
    'email' : IDL.Text,
    'updatedAt' : IDL.Int,
    'address' : IDL.Opt(Address),
    'phone' : IDL.Opt(IDL.Text),
  });
  const UserError = IDL.Variant({
    'UserAlreadyExists' : IDL.Null,
    'InvalidInput' : IDL.Text,
    'Unauthorized' : IDL.Null,
    'InvalidEmail' : IDL.Null,
    'UserNotFound' : IDL.Null,
  });
  const Result_7 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : UserError });
  const PaymentError = IDL.Variant({
    'InvalidAmount' : IDL.Null,
    'PaymentFailed' : IDL.Text,
    'Unauthorized' : IDL.Null,
    'InvalidBlockIndex' : IDL.Null,
    'PaymentNotFound' : IDL.Null,
    'TransferFailed' : IDL.Text,
    'InsufficientFunds' : IDL.Null,
  });
  const Result_5 = IDL.Variant({ 'ok' : Payment, 'err' : PaymentError });
  const Result_1 = IDL.Variant({ 'ok' : User, 'err' : UserError });
  const Result = IDL.Variant({ 'ok' : SellerProfile, 'err' : BuyerMatchError });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const Request = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const StreamingToken = IDL.Record({ 'arbitrary_data' : IDL.Text });
  const StreamingCallbackResponse = IDL.Record({
    'token' : IDL.Opt(StreamingToken),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const StreamingCallback = IDL.Func(
      [StreamingToken],
      [IDL.Opt(StreamingCallbackResponse)],
      ['query'],
    );
  const StreamingStrategy = IDL.Variant({
    'Callback' : IDL.Record({
      'token' : StreamingToken,
      'callback' : StreamingCallback,
    }),
  });
  const Response = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const Result_6 = IDL.Variant({
    'ok' : PotentialMatch,
    'err' : BuyerMatchError,
  });
  const UserRegistration = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'address' : IDL.Opt(Address),
    'phone' : IDL.Opt(IDL.Text),
  });
  const TopUpRequest = IDL.Record({ 'amount' : IDL.Nat });
  const ICPTopUpRequest = IDL.Record({
    'blockIndex' : IDL.Opt(IDL.Nat),
    'amount' : IDL.Nat,
  });
  const BuyerProfileUpdate = IDL.Record({
    'name' : IDL.Opt(IDL.Text),
    'email' : IDL.Opt(IDL.Text),
    'phone' : IDL.Opt(IDL.Text),
    'budget' : IDL.Opt(IDL.Nat),
    'location' : IDL.Opt(Address),
  });
  const ProductUpdate = IDL.Record({
    'categoryId' : IDL.Opt(CategoryId),
    'keySellingPoints' : IDL.Opt(IDL.Vec(IDL.Text)),
    'name' : IDL.Opt(IDL.Text),
    'minimumPrice' : IDL.Opt(IDL.Nat),
    'reasonForSelling' : IDL.Opt(IDL.Text),
    'targetPrice' : IDL.Opt(IDL.Nat),
    'description' : IDL.Opt(IDL.Text),
    'isActive' : IDL.Opt(IDL.Bool),
    'stock' : IDL.Opt(IDL.Nat),
    'imageBase64' : IDL.Opt(IDL.Text),
    'pickupDeliveryInfo' : IDL.Opt(IDL.Text),
    'knownFlaws' : IDL.Opt(IDL.Text),
    'price' : IDL.Opt(IDL.Nat),
    'condition' : IDL.Opt(IDL.Text),
  });
  const UserUpdate = IDL.Record({
    'name' : IDL.Opt(IDL.Text),
    'address' : IDL.Opt(Address),
    'phone' : IDL.Opt(IDL.Text),
  });
  const SellerProfileUpdate = IDL.Record({
    'businessName' : IDL.Opt(IDL.Text),
    'description' : IDL.Opt(IDL.Text),
    'contactEmail' : IDL.Opt(IDL.Text),
    'location' : IDL.Opt(Address),
    'contactPhone' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'addPurchaseRecord' : IDL.Func([PurchaseRecord], [Result_4], []),
    'cancelOrder' : IDL.Func([OrderId], [Result_3], []),
    'createBuyerProfile' : IDL.Func([BuyerProfileInput], [BuyerProfile], []),
    'createCategory' : IDL.Func([CategoryInput], [Category], []),
    'createOrder' : IDL.Func([OrderInput], [Result_3], []),
    'createProduct' : IDL.Func([ProductInput], [Result_2], []),
    'createSellerProfile' : IDL.Func([SellerProfileInput], [SellerProfile], []),
    'findPotentialMatches' : IDL.Func([MatchingCriteria], [Result_8], []),
    'getAllBuyerProfiles' : IDL.Func([], [IDL.Vec(BuyerProfile)], []),
    'getAllMatches' : IDL.Func([], [IDL.Vec(PotentialMatch)], []),
    'getAllOrders' : IDL.Func([], [IDL.Vec(Order)], []),
    'getAllPayments' : IDL.Func([], [IDL.Vec(Payment)], []),
    'getAllProducts' : IDL.Func([], [IDL.Vec(Product)], []),
    'getAllSellerProfiles' : IDL.Func([], [IDL.Vec(SellerProfile)], []),
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], []),
    'getBalance' : IDL.Func([], [Result_7], []),
    'getBuyerProfile' : IDL.Func([], [Result_4], []),
    'getBuyerProfileById' : IDL.Func([BuyerId], [Result_4], []),
    'getCategories' : IDL.Func([], [IDL.Vec(Category)], ['query']),
    'getInfo' : IDL.Func(
        [],
        [
          IDL.Record({
            'name' : IDL.Text,
            'description' : IDL.Text,
            'version' : IDL.Text,
            'timestamp' : IDL.Int,
          }),
        ],
        ['query'],
      ),
    'getMatchesForSeller' : IDL.Func([], [IDL.Vec(PotentialMatch)], []),
    'getMyDepositInfo' : IDL.Func(
        [],
        [
          IDL.Record({
            'instructions' : IDL.Text,
            'userSubaccount' : IDL.Text,
            'platformAccount' : IDL.Principal,
          }),
        ],
        [],
      ),
    'getMyMatches' : IDL.Func([], [IDL.Vec(PotentialMatch)], []),
    'getMyOrders' : IDL.Func([], [IDL.Vec(Order)], []),
    'getMyPayments' : IDL.Func([], [IDL.Vec(Payment)], []),
    'getOrder' : IDL.Func([OrderId], [Result_3], []),
    'getOrdersByStatus' : IDL.Func([OrderStatus], [IDL.Vec(Order)], []),
    'getOwnerICPAccount' : IDL.Func(
        [],
        [
          IDL.Record({
            'principal' : IDL.Text,
            'instructions' : IDL.Text,
            'minimumAmount' : IDL.Nat,
            'account' : IDL.Text,
          }),
        ],
        ['query'],
      ),
    'getPayment' : IDL.Func([PaymentId], [Result_5], []),
    'getPaymentConfig' : IDL.Func(
        [],
        [
          IDL.Record({
            'minimumAmount' : IDL.Nat,
            'simulationMode' : IDL.Bool,
            'platformAccount' : IDL.Principal,
          }),
        ],
        ['query'],
      ),
    'getProduct' : IDL.Func([ProductId], [Result_2], ['query']),
    'getProducts' : IDL.Func([], [IDL.Vec(Product)], ['query']),
    'getProductsByCategory' : IDL.Func(
        [CategoryId],
        [IDL.Vec(Product)],
        ['query'],
      ),
    'getProfile' : IDL.Func([], [Result_1], []),
    'getSellerProfile' : IDL.Func([], [Result], []),
    'getSellerProfileById' : IDL.Func([SellerId], [Result], []),
    'health' : IDL.Func(
        [],
        [IDL.Record({ 'status' : IDL.Text, 'timestamp' : IDL.Int })],
        ['query'],
      ),
    'http_request' : IDL.Func([Request], [Response], ['query']),
    'http_request_update' : IDL.Func([Request], [Response], []),
    'markMatchAsViewed' : IDL.Func([IDL.Nat], [Result_6], []),
    'registerUser' : IDL.Func([UserRegistration], [Result_1], []),
    'setMatchInterest' : IDL.Func([IDL.Nat, IDL.Bool], [Result_6], []),
    'topUpBalance' : IDL.Func([TopUpRequest], [Result_5], []),
    'topUpBalanceWithICP' : IDL.Func([ICPTopUpRequest], [Result_5], []),
    'updateBuyerProfile' : IDL.Func([BuyerProfileUpdate], [Result_4], []),
    'updateOrderStatus' : IDL.Func([OrderId, OrderStatus], [Result_3], []),
    'updateProduct' : IDL.Func([ProductId, ProductUpdate], [Result_2], []),
    'updateProfile' : IDL.Func([UserUpdate], [Result_1], []),
    'updateSellerProfile' : IDL.Func([SellerProfileUpdate], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
