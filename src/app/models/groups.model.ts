import { group } from "@angular/animations";

export class Groups {
    GroupName: string;
    SponsorName: string;
    SponsorPhone: string;
    SponsorEmail: string;

    constructor(groupName: string,
        sponsorName: string,
        sponsorPhone: string,
        sponsorEmail: string) {
        this.GroupName = groupName;
        this.SponsorName = sponsorName;
        this.SponsorPhone = sponsorPhone;
        this.SponsorEmail = sponsorEmail;
    }
}
