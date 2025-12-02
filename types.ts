export enum ServiceType {
  AirFreight = "Air Freight",
  SeaFreight = "Sea Freight",
  LandFreight = "Land Freight",
  DoorToDoor = "Door to Door",
  WarehouseStorage = "Warehouse Storage",
  AirCharter = "Air Charter",
  Procurement = "Procurement",
  HomeMoving = "Home Moving"
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Branch {
  country: string;
  city: string;
}
