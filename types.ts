// === SERVICE TYPE ENUM ===
// Note: Enum values are used as internal keys. Display names are handled via i18n.
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

// === HELPER: Map ServiceType to i18n translation key ===
export const serviceTypeToI18nKey: Record<ServiceType, string> = {
  [ServiceType.AirFreight]: 'services.airFreight',
  [ServiceType.SeaFreight]: 'services.seaFreight',
  [ServiceType.LandFreight]: 'services.landFreight',
  [ServiceType.DoorToDoor]: 'services.doorToDoor',
  [ServiceType.WarehouseStorage]: 'services.warehouseStorage',
  [ServiceType.AirCharter]: 'services.airCharter',
  [ServiceType.Procurement]: 'services.procurement',
  [ServiceType.HomeMoving]: 'services.homeMoving',
};

// === HELPER: Get translated service title ===
// Usage: getServiceTitle(t, ServiceType.AirFreight) => t('services.airFreight.title')
export const getServiceTitle = (t: (key: string) => string, serviceType: ServiceType): string => {
  return t(`${serviceTypeToI18nKey[serviceType]}.title`);
};

// === HELPER: Get translated service description ===
export const getServiceDesc = (t: (key: string) => string, serviceType: ServiceType): string => {
  return t(`${serviceTypeToI18nKey[serviceType]}.desc`);
};

export interface NavItem {
  label: string;
  href: string;
}

export interface Branch {
  country: string;
  city: string;
}
