import { CardInfo } from '../components/CardInfo';
import './Card.css'

interface Props {
    card: CardInfo
}

const Card = (props: Props) => {
    const {id, side1, side2, pronunciation} = props.card
    return (
        <div className='card-container'>
            <div className="card" key={id}>
                <div className="front">
                    <div className="side1">{side1}</div>
                </div>
                <div className="back">
                    <div className="side2">{side2}</div>
                    <div className="pronunciation">{pronunciation}</div>
                </div>
            </div>
        </div>
    )
}

export default Card