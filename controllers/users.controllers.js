const prisma = require("../middlewares/database.js");

module.exports = {
  getAllusers: async (req, res, next) => {
    try {
      const users = await prisma.user.findMany({
        include: {
          profile: true,
        },
      });

      res.status(200).send({
        status: "Success",
        message: "Data ketemu",
        data: users,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getUserId: async (req, res, next) => {
    const id = req.params.id;

    try {
      const datas = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          profile: true,
        },
      });

      if (datas === null || !datas) {
        return res.status(400).send({
          status: "Failed",
          message: `ID ${id} tidak ditemukan`,
        });
      }

      res.status(200).send({
        status: "Success",
        message: `Data user id ${req.params.id}`,
        data: datas,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  addUser: async (req, res, next) => {
    const users = req.body;

    try {
      const dataUser = await prisma.user.create({
        data: {
          ...users,
        },
      });

      res.status(200).send({
        status: "Success",
        message: "Data Created",
        data: dataUser,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateUserId: async (req, res, next) => {
    const { id } = req.params;
    const users = req.body;

    try {
      const search = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (search === null || !search) {
        return res.status(400).send({
          status: "Failed",
          message: "Update data gagal",
        });
      }

      const datas = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          ...users,
        },
      });

      res.status(200).send({
        status: "Succes",
        message: "Updated",
        data: datas,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteUserId: async (req, res, next) => {
    const id = req.params.id;

    try {
      const search = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (search === null || !search) {
        return res.status(400).send({
          status: "Failed",
          message: `ID ${id} Tidak ditemukan`,
        });
      }

      await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(200).send({
        status: "Succes",
        message: "Deleted data user",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
