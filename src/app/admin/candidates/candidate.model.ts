export class Candidate {
    constructor(
        public firstName: string, 
        public lastName: string, 
        public branch: string,
        public campaignQuote: string,
        public designation: string,
        public symbol: string,
        public imgPath: string,
        public id?: number) {
    }
}