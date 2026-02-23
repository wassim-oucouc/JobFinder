export interface Job
{
  id : number,
  contents : string
  name : string,
  type : string,
  publication_date : Date,
  short_name : string,
  model_type : string,
  locations : [
    {
      name: string
    }
  ],
  categories : [],
  levels : [
    {
      name: string,
      short_name: string
    }
  ],
  tags : [],
  refs : {
    landing_page : string
  },
  company : {
    short_name : string,
    name : string
  },
}
