import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import img4 from "./images/img4.jpg";
import img5 from "./images/img5.jpg";
import imga from "./images/imga.jpg";
import imgc from "./images/imgc.jpg";
import imgd from "./images/imgd.jpg";
import imge from "./images/imge.jpg";
import imgf from "./images/imgf.jpg";
import imgg from "./images/imgg.jpg";
import "./App.css";
import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Button, Dialog, Grid, Stack, Typography } from "@mui/material";
function App() {
  let imgArr = [
    {
      name: "Orange Cake",
      img: img2,
      price: 250,
      addedStatus: false,
      id: 0,
      count: 1,
    },
    {
      name: "Cupcakes",
      img: img3,
      price: 240,
      addedStatus: false,
      id: 1,
      count: 1,
    },
    {
      name: "Pizza Cake",
      img: img5,
      price: 150,
      addedStatus: false,
      id: 2,
      count: 1,
    },
    {
      name: "Mango Cake",
      img: imga,
      price: 230,
      addedStatus: false,
      id: 3,
      count: 1,
    },
    {
      name: "Chocolate Cake",
      img: imgd,
      price: 250,
      addedStatus: false,
      id: 4,
      count: 1,
    },
    {
      name: "Pestry Cake",
      img: imge,
      price: 120,
      addedStatus: false,
      id: 5,
      count: 1,
    },
    {
      name: "Dry fruit Cake",
      img: imgf,
      price: 130,
      addedStatus: false,
      id: 6,
      count: 1,
    },
    {
      name: "Choco Cake",
      img: imgg,
      price: 200,
      addedStatus: false,
      id: 7,
      count: 1,
    },
  ];
  const [totalPrice, setTotalPrice] = useState(0);
  const [imgArray, setImagArray] = useState(imgArr);
  const [cartArray, setCartArray] = useState({});
  const [open, setOpen] = useState(false);
  const handleChange = (id) => {
    let temp = JSON.parse(JSON.stringify(imgArray));
    temp[id].addedStatus = !temp[id].addedStatus;
    let tempObj = JSON.parse(JSON.stringify(cartArray));

    if (temp[id].addedStatus) {
      tempObj[`${temp[id].id}`] = temp[id];
    } else {
      delete tempObj[temp[id].id];
    }
    setImagArray(temp);
    setCartArray(tempObj);
    let tempPrice = 0;
    Object.values(tempObj).forEach((ele) => {
      tempPrice += ele.price * ele.count;
    });
    setTotalPrice(tempPrice);
  };
  const handleCountChange = (value, id) => {
    let tempObj = JSON.parse(JSON.stringify(cartArray));
    tempObj[id].count = value;
    setCartArray(tempObj);
    let tempPrice = 0;
    Object.values(tempObj).forEach((ele) => {
      tempPrice += ele.price * ele.count;
    });
    setTotalPrice(tempPrice);
  };
  const handleRemoveItem = (id) => {
    let tempObj = JSON.parse(JSON.stringify(cartArray));
    delete tempObj[id];
    setCartArray(tempObj);
    let temp = JSON.parse(JSON.stringify(imgArray));
    temp[id].addedStatus = !temp[id].addedStatus;
    setImagArray(temp);
    let tempPrice = 0;
    Object.values(tempObj).forEach((ele) => {
      tempPrice += ele.price * ele.count;
    });
    setTotalPrice(tempPrice);
  };
  const handleClose = () => {
    setCartArray({});
    setImagArray(imgArr);
    setTotalPrice(0);
    setOpen(false);
  };
  return (
    <>
      <div className="App">
        <section id="header">
          <img src={img4} alt="img" />
          <h1>Sanika's Bakery</h1>
          <div id="navbar">
            <ul>
              <li>Home</li>
              <li>Cakes</li>
              <li>Blog</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <a href="#">
            <i className="fa-solid fa-cart-shopping">
              <sup className="shopcartnum"></sup>
            </i>
          </a>
        </section>

        <section id="product1">
          <h2>Online Cakes Delivery</h2>
          <p>All over india</p>
          <div className="pro-container">
            {imgArray.map((ele, idx) => {
              return (
                <div key={idx} className="pro">
                  <img src={ele.img} className="img" alt="img" />
                  <div className="des">
                    <h5>{ele.name}</h5>
                    <h4>{ele.price}</h4>
                  </div>

                  <h1 className="cart">
                    <div onClick={() => handleChange(ele.id)}>
                      {ele.addedStatus ? (
                        <VerifiedIcon />
                      ) : (
                        <ShoppingCartIcon />
                      )}
                    </div>
                  </h1>
                </div>
              );
            })}
          </div>
        </section>

        <section className="container content-section">
          <h2 className="section-header">CART</h2>
          <div className="cart-row1">
            <span className="cart-item cart-header cart-column">ITEM</span>
            <span className="cart-price cart-header cart-column">PRICE</span>
            <span className="cart-quantity cart-header cart-column">
              QUANTITY
            </span>
          </div>
          {Object.keys(cartArray).length ? (
            <div className="cart-items">
              {Object.keys(cartArray).map((ele, idx) => {
                return (
                  <div key={idx} className="cart-row">
                    <div className="cart-item cart-column">
                      <img
                        className="cart-item-image"
                        src={cartArray[ele].img}
                        width="100"
                        height="100"
                      />
                      <span className="cart-item-title">
                        {cartArray[ele].name}
                      </span>
                    </div>
                    <span className="price cart-price cart-column">
                      {cartArray[ele].price * cartArray[ele].count}
                    </span>
                    <div className="cart-quantity cart-column">
                      <input
                        className="cart-quantity-input"
                        type="number"
                        defaultValue={1}
                        min={1}
                        value={cartArray[ele].count}
                        onChange={(e) =>
                          handleCountChange(e.target.value, cartArray[ele].id)
                        }
                      />
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => handleRemoveItem(ele)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="cart-total">
            <strong className="cart-total-title">Total</strong>
            <span className="cart-total-price">${totalPrice}</span>
          </div>
          <button
            disabled={Object.keys(cartArray).length ? false : true}
            className="btn btn-primary btn-purchase"
            type="button"
            onClick={() => setOpen(true)}
          >
            Buy Now
          </button>
        </section>
      </div>
      <Dialog
        PaperProps={{ sx: { maxWidth: "none" } }}
        open={open}
        onClose={handleClose}
      >
        <Grid container p={4} spacing={4}>
          <Grid item lg={12} display='flex' flexDirection={'row'} justifyContent='center'>
            <Typography variant="h3"> Thank You Of Shopping With Us</Typography>
          </Grid>
          <Grid item lg={12}>
            <Stack alignItems={"center"}>
              <Button variant="contained" onClick={handleClose}>
                Close
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

export default App;
