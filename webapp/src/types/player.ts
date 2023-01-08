export type Player = {
    id: string,
    name: string,
    dateOfBirth: Date,
    location: string,
    team: string,
    gender: Gender,
    about: string,
    sports: string[],
    interests: string[],
    profilePicture: string
}

export enum Gender {
    Other = "Other",
    Male = "Male",
    Female = "Female",
}
