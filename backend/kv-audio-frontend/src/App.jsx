import "./App.css";
import ProductCard from "./components/productCard";

function App() {
  return (
    <div>
      <ProductCard name="Audio setup" price="3250/=" 
      description="dfvsf fscsdc sdcsdc sddswdc" 
      photoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb5EWPwRAqt5sl4qk8LuMjK9zdRAg4YWdBVw&s" />

      <ProductCard name="Phone case" price="1500/=" 
      description="AnDyH Phone case For Xiaomi POCO M3 Pro 5G Case,Creative Fashion Luxury New 3D Swan Retractable Stand Phone Case Premium Simple Solid Color Straight Edge Plating Soft Silicone Shockproof Casing Protective Back Cover"
      photoUrl="https://img.drz.lazcdn.com/static/lk/p/481b8187fae456bf439c15fa919bc21f.jpg_720x720q80.jpg_.webp" />

    </div>
  );
}

export default App;
