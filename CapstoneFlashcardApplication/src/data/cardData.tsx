// since this data file contains an array of flashcards,
// import the tsx file that holds the interface that defines what a flashcard is (CardInfo.tsx)
// this way TS can recognize what CardInfo is and what fields it has
import { CardInfo } from '../components/CardInfo'

const cardData: CardInfo[] = [
    {
        id: 1,
        side1: "to be",
        side2: "是",
        pronunciation: "shì",
    },
    {
        id: 2,
        side1: "not",
        side2: "不",
        pronunciation: "bù",
    },
    {
        id: 3,
        side1: "person",
        side2: "人",
        pronunciation: "rén",
    },
    {
        id: 4,
        side1: "we",
        side2: "我们",
        pronunciation: "wǒmen",
    },
    {
        id: 5,
        side1: "at",
        side2: "在",
        pronunciation: "zài",
    },
    {
        id: 6,
        side1: "country",
        side2: "国",
        pronunciation: "guó",
    },
    {
        id: 7,
        side1: "middle",
        side2: "中",
        pronunciation: "zhōng",
    },
    {
        id: 8,
        side1: "have",
        side2: "有",
        pronunciation: "yǒu",
    },
    {
        id: 9,
        side1: "that",
        side2: "那",
        pronunciation: "nà",
    },
    {
        id: 10,
        side1: "to go",
        side2: "去",
        pronunciation: "qù",
    },
    {
        id: 11,
        side1: "to study, to learn",
        side2: "学",
        pronunciation: "xué",
    },
    {
        id: 12,
        side1: "to use",
        side2: "用",
        pronunciation: "yòng",
    },
    {
        id: 13,
        side1: "face, surface",
        side2: "面",
        pronunciation: "miàn",
    },
    {
        id: 14,
        side1: "work",
        side2: "工",
        pronunciation: "gōng",
    },
    {
        id: 15,
        side1: "speech",
        side2: "话",
        pronunciation: "huà",
    },
    {
        id: 16,
        side1: "very, quite",
        side2: "很",
        pronunciation: "hěn",
    },
    {
        id: 17,
        side1: "good",
        side2: "好",
        pronunciation: "hǎo",
    },
    {
        id: 18,
        side1: "bright, clear",
        side2: "明",
        pronunciation: "míng",
    },
    {
        id: 19,
        side1: "year",
        side2: "年",
        pronunciation: "nián",
    },
    {
        id: 20,
        side1: "king",
        side2: "王",
        pronunciation: "wáng",
    },
];

export default cardData;