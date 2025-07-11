import "./productCard.css";
export default function ProductCard(props){
    
    return(
        <div>
            <img src={props.photoUrl}/>
            <span>JBL {props.name}</span>
            <span>LKR. {props.price}</span>
            <p>{props.description}</p>
        </div>
    )

}



//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ47MYWiCDefpTUqWPeG7wrxGm0-t9t7Ab1bg&s