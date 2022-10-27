import { Link } from 'react-router-dom';


function Header(props) {
    return (

        <header className="d-flex justify-between align-center p-40">
                <Link to="/">
                <div className="d-flex align-center">
                    <img height="60" width="60" src="/img/logo.png" alt="Logo" />
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                    </div>
                </Link>
            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img height="18" width="18" src="/img/cart.png" alt="Cart" />
                    <span> 1205 $</span>
                </li>
                <Link to="/favorites">
                    <li className="mr-30 cu-p" >
                        <img height="18" width="18" src="/img/heart.svg" alt="Heart" />
                    </li>
                </Link>
                <li>
                    <img height="18" width="18" src="/img/user.png" alt="User" />
                </li>

            </ul>
        </header>
    )
}

export default Header;