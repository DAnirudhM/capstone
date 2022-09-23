import { Members } from "./members";

export class Groups {
    GroupId: number;
    GroupName: string;
    OrganizationName: string;
    MaxGroupSize: number;
    SponsorName: string;
    SponsorPhone: string;
    SponsorEmail: string;
    Members: Members[];

    constructor(
        groupId: number,
        groupName: string,
        organizationName: string,
        maxGroupSize: number,
        sponsorName: string,
        sponsorPhone: string,
        sponsorEmail: string,
        members: Members[]
    ) {
        this.GroupId = groupId;
        this.GroupName = groupName;
        this.OrganizationName = organizationName;
        this.MaxGroupSize = maxGroupSize;
        this.SponsorName = sponsorName;
        this.SponsorPhone = sponsorPhone;
        this.SponsorEmail = sponsorEmail;
        this.Members = members;
    }
}
