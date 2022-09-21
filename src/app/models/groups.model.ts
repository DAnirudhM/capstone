import { group } from "@angular/animations";

export class Groups {
    groupName: string;
    sponsorName: string;
    sponsorPhone: string;
    sponsorEmail: string;

    constructor(groupName: string,
        sponsorName: string,
        sponsorPhone: string,
        sponsorEmail: string) {
        this.groupName = groupName;
        this.sponsorName = sponsorName;
        this.sponsorPhone = sponsorPhone;
        this.sponsorEmail = sponsorEmail;
    }
}
