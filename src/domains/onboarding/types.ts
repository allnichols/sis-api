

type SchoolInfo = {
    name: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
}

type InitialRegister = {
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
  schoolInfo: SchoolInfo
};

export type {
    InitialRegister
}