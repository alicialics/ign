import axios from 'axios';
import { VIDEOS, ARTICLES } from "./constants";

const NUM_PER_PAGE = 10;

export function filterItems(items, mode) {
    switch (mode) {
        case VIDEOS:
            return items.filter(({ contentType }) => contentType === 'video');
        case ARTICLES:
            return items.filter(({ contentType }) => contentType === 'article');
        default:
            return items;
    }
}

export async function loadItems(page) {
    const { data: { data } } = await axios(`/api/content?startIndex=${page * NUM_PER_PAGE}&count=${NUM_PER_PAGE}`);
    return data;
}

export async function loadComments(ids) {
    const { data: { content } } = await axios(`/api/comments?ids=${ids.join(",")}`);
    return content;
}
