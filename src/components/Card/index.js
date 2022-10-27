import styles from './Card.module.scss'
import React from 'react';

function Card({ id, title, imageUrl, price, onFavorite, onPlus, favorited = false }) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(favorited);


    const onClickPlus = () => {
        onPlus({ title, imageUrl, price });
        setIsAdded(!isAdded)
    }

    const onClickFavorite = () => {
        onFavorite({ id, title, imageUrl, price })
        setIsFavorite(!isFavorite)
    }


    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
                <img 
                onClick={onClickFavorite} 
                src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} 
                alt="Heart-unliked" 
                />
            </div>
            <img height="112" width="133" src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b> {price} $</b>
                </div>
                <img
                    className={styles.plus}
                    onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                    alt="Plus"
                />
            </div>
        </div>
    )
}

export default Card;

