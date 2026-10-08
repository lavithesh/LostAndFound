import { useNavigate } from "react-router-dom";


function ItemCard({ item ,type }) {

    const navigate = useNavigate();

    return (
        <div className="item-card"
        onClick={() => navigate(`/item/${type}/${item.id}`)}>

            {/* Image */}
            <div className="item-image">

                {item.image ? (
                    <img
                        src={`http://localhost:9000${item.image}`}
                        alt={item.itemName}
                    />
                ) : (
                    <div className="no-image">
                        📦
                    </div>
                )}

                <span className="status-badge">
                    {item.status}
                </span>

            </div>


            {/* Content */}
            <div className="item-content">

                <h3>
                    {item.itemName}
                </h3>

                <p className="item-description">
                    {item.description}
                </p>


                <div className="item-details">

                    <div className="item-detail">
                        <span>📍</span>
                        <span>{item.location}</span>
                    </div>

                    <div className="item-detail">
                        <span>📅</span>
                        <span>{item.dateLost}</span>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default ItemCard;