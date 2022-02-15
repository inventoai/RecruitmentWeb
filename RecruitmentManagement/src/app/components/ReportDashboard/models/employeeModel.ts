export class Employee {
    _id: string;
    employeeName: string;
    mobileNumber: string;
    emailId: string;
    doj: string;
    accessType: string;
    active: boolean;
}

export class Company {
    _id: string;
    companyName: string;
    companyURL: string;
    corporatePresentation: string;
    branches: string;
    remarks: string;
    location: string;
    active: boolean;
}

export class Client {
    _id: string;
    clientName: string;
    clientyURL: string;
    corporatePresentation: string;
    branches: string;
    remarks: string;
    active: boolean;
}
export class CompanyList {
    _id: string;
    companyName: string;
    active: boolean;
}
export class ClientList {
    _id: string;
    clientName: string;
    active: boolean;
}

export const openingForm = {
    employeeType: '',
    contractDuration: '',
    domain: '',
    role: '',
    companyName: '',
    clientName: '',
    location: '',
    experiance: '',
    budgetRange: '',
    nop: Number,
    noticePeriod: '',
    jobDescription: '',
    mandatorySkills: Array[''],
    wfh: '',
    questions: Array['']
};

export const employeeForm = {
    employeeName: '',
    gender: '',
    mobileNumber: '',
    personalEmailId: '',
    officeEmailId: '',
    dob: '',
    doj: '',
    designation: '',
    employeeId: ''
};

// export const employeeForm = {
//     employeeName: '',
//     gender: '',
//     mobileNumber: '',
//     personalEmailId: '',
//     officeEmailId: '',
//     dob: '',
//     doj: '',
//     designation: '',
//     employeeId: '',
//     doc: '',
//     photo: '',
//     accessType: {
//         access1: false,
//         access2: false,
//         access3: false
//     }
// };