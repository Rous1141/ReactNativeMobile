interface ArtToolProps{
    id: string,
    artName: string,
    price: number,
    description: string,
    glassSurface: boolean | false,
    image: string,
    brand: string,
    limitedTimeDeal: number | 0,
    feedbacks: FeedBackProps[] | null
}

interface FeedBackProps{
    rating: number,
    comment: string,
    author: string,
    date: string
}
