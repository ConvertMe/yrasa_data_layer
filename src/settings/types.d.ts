interface AvitoJKeyI {
    _text: string
}

export interface AvitoFeedI {
    Id: AvitoJKeyI
    DateBegin?: AvitoJKeyI
    DateEnd?: AvitoJKeyI
    ListingFee?: AvitoJKeyI
    AdStatus?: AvitoJKeyI
    AvitoId?: AvitoJKeyI
    ManagerName?: AvitoJKeyI
    ContactPhone?: AvitoJKeyI
    Description: AvitoJKeyI
    Images?: {Option: AvitoJKeyI[]}
    VideoUR?: AvitoJKeyI
    ContactMethod?: AvitoJKeyI
    Category: AvitoJKeyI
    Price: AvitoJKeyI
    OperationType: AvitoJKeyI
    BalconyOrLoggiaMulti?: {Option: AvitoJKeyI[]}
    MarketType: AvitoJKeyI
    HouseType: AvitoJKeyI
    Floor: AvitoJKeyI
    Floors: AvitoJKeyI
    Rooms: AvitoJKeyI
    Square: AvitoJKeyI
    KitchenSpace?: AvitoJKeyI
    LivingSpace?: AvitoJKeyI
    Status: AvitoJKeyI
    ViewFromWindows: {Option: AvitoJKeyI[]}
    PassengerElevator?: AvitoJKeyI
    FreightElevator?: AvitoJKeyI
    Courtyard?: {Option: AvitoJKeyI[]}
    Parking?: {Option: AvitoJKeyI[]}
    RoomType?: {Option: AvitoJKeyI[]}
    BathroomMulti?: {Option: AvitoJKeyI[]}
    SaleOptions?: {Option: AvitoJKeyI[]}
    CeilingHeight?: AvitoJKeyI
    NDAdditionally?: {Option: AvitoJKeyI[]}
    NewDevelopmentId: AvitoJKeyI
    DevelopmentsBuildingName?: AvitoJKeyI
    PropertyRights: AvitoJKeyI
    Decoration: AvitoJKeyI
    SaleMethod?: AvitoJKeyI
    ShareholderFirstName?: AvitoJKeyI
    ShareholderLastName?: AvitoJKeyI
    ShareholderPatronymic?: AvitoJKeyI
    ShareholderINN?: AvitoJKeyI
}