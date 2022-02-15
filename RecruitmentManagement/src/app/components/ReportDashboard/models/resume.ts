export class Resume {
    email: string;
    mobile: string;
}

export const resumeJson = {
    candidateName: '',
    mobileNumber: '',
    emailId: '',
    totalExperiance: '',
    relatedExperiance: '',
    cctc: '',
    ectc: '',
    isNp: '',
    np: '',
    dos: '',
    location: '',
    others: '',
    remarks: '',
    openingId: '',
    recruiterId: '',
    slot: '',
    workAllocationId: ''
};


export interface FormModel {
    senderEmail?: string;
    candidateMail?: string;
    compose?: string;
    senderPass?: string;
    captcha?: string;
}

// export const EmailForm = {
//     senderEmail: '',
//     candidateMail: '',
//     cc: Array[''],
//     bcc: Array[''],
//     compose: '',
//     senderPass: ''
// }