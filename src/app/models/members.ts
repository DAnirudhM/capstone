export class Members {
    MemberId: number;
    MemberEmail: string;
    MemberName: string;
    MemberPhone: string;

    constructor(memberId: number,
        memberEmail: string,
        memberName: string,
        memberPhone: string
    ) {
        this.MemberId = memberId;
        this.MemberEmail = memberEmail;
        this.MemberName = memberName;
        this.MemberPhone = memberPhone;
    }
}
