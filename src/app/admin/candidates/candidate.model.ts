export class Candidate {
    constructor(
        public firstName: string, 
        public lastName: string, 
        public branch: string,
        public campaignQuote: string,
        public designation: string,
        public symbol: string,
        public img: File,
        public id?: number,
        public imgData?: string) {
    }
}