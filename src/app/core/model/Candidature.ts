 export interface Candidature
{
  id: number;
  userId : number,
  offerId : number,
  apiSource : string,
  title : string,
  company : string,
  location : string,
  url : string,
  status : string,
  notes    : string,
  dateAdded : Date
}
