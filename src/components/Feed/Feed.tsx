import { FC } from "react";
import done from "../../images/Done.svg"
import { useAppSelector } from "../../types/redux"
import FeedStyles from "./Feed.module.css"



interface Feed {
    className?: string;

}
const Feed:FC<Feed> = function (props) {
  	const { } = useAppSelector(state => state.order)
    return (
        <section className={FeedStyles["feed"]}>
        </section>
    )
}

export default Feed;