export const fileHelper = {
  uploadFile: () => {
    //     const image = req.files.image;
    //     const fileExtension =
    //       image.name.split(".")[image.name.split(".").length - 1]; // Getting file extension by splitting on extesion dot(.)
    //     const fileName = new Date().toISOString() + "." + fileExtension; // Creating a new file name with new Date() and fileExtension
    //     const imagePath = "/images/owners/" + fileName; // Setting the public path
    //     req.body.image = imagePath;
    //     const username =
    //       req.body.email.split("@")[0] + Math.floor(Math.random() * 10000 + 1); // Generating a username with email address
    //     const password = Math.random().toString(36).substring(7); // Generating password
    //     adminService.sendAddTheaterOwnerMail(
    //       req.body.email,
    //       username,
    //       password,
    //       async (e: any) => {
    //         if (e) {
    //           res.redirect("/admin/theater/add-owner");
    //         } else {
    //           req.body.username = username;
    //           req.body.password = password;
    //           await sharp(req.files.image.data)
    //             .resize({ width: 360 })
    //             .toFile(`./public/images/owners/${fileName}`);
    //           adminService
    //             .addTheaterOwner(req.body)
    //             .then(() => res.redirect("/admin/theater"))
    //             .catch(() => res.redirect("/admin/theater/add-owner"));
    //         }
    //       }
    //     );
    return true;
  },
};
