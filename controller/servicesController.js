const serviceModel = require("../models/servicesModel");
const jwt = require("jsonwebtoken");

module.exports.getServices = async (req, res) => {
  
  const _data = await serviceModel.find({});
  if (_data) {
    console.log(_data);
    return res.send({ code: 200, message: "success", data: _data });
  } else {
    return res.send({ code: 500, message: "Service error" });
  }
};


module.exports.addServices = async (req, res) => {
  console.log(req.file, req.body , 16)
  try{  
  // if (!req.headers.authorization) {
  //   return res.send({ code: 403, message: "No Token" });
  // } 

    // const userDetail = await jwt.verify(req.headers.authorization, "PRIV_123");
    // console.log(userDetail, 19);

    // if (
    //   userDetail._doc.type !== "SUBADMIN" &&
    //   userDetail._doc.type !== "ADMIN"
    // ) {
    //   return res.send({ code: 403, message: "Unauthorized" });
    // }

    // if (userDetail.iat - new Date().getTime() > 3.6e6) {
    //   return res.send({ code: 403, message: "Token Expired" });
    // }

    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.file.path

    if (!title || !description || !imageUrl) {
      return res.send({ code: 400, message: "Bad Request" });
    }

    const newService = new serviceModel({
      title: title,
      description: description,
      imageUrl: imageUrl
    });

    const success = await newService.save();

    if (success) {
      return res.send({ code: 200, message: "Add success" });
    } else {
      return res.send({ code: 500, message: "Service error" });
    }
  }
  catch(err){
    res.send({ code: 500, message: 'Internal Server Error'})
  }
};

module.exports.getSlider = (req, res) => {
  const url1 =
    "https://plus.unsplash.com/premium_photo-1713296255442-e9338f42aad8?q=80&w=1322&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const url2 =
    "https://images.unsplash.com/photo-1658200543015-cd38d8f25455?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D";
  const url3 =
    "https://images.unsplash.com/photo-1609345635784-fd4a890e2326?q=80&w=1309&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const url4 =
    "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const arr = [url1, url2, url3, url4];
  return res.send({ code: 200, message: "success", data: arr });
};
