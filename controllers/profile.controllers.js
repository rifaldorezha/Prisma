const prisma = require("../middlewares/database.js");

module.exports = {
  getAllProfile: async (req, res, next) => {
    try {
      const profiles = await prisma.profile.findMany({
        include: {
          user: {
            select: {
              name: true,
              alamat: true,
            },
          },
        },
      });

      res.status(200).send({
        message: "Data all profile",
        datas: profiles,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getProfileId: async (req, res, next) => {
    const id = req.params.id;

    try {
      const datas = await prisma.profile.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          user: true,
        },
      });

      if (datas === null) {
        return res.status(400).send({
          status: "Failed",
          message: `Profile id ${id} tidak ditemukan`,
        });
      }

      res.status(200).send({
        status: "Success",
        message: `Data profile id ${id}`,
        data: datas,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  addProfile: async (req, res, next) => {
    const profiles = req.body;

    try {
      const datas = await prisma.profile.create({
        data: {
          ...profiles,
        },
      });

      if (datas === null) {
        return res.status(400).send({
          message: "Data kurang lengkap",
        });
      }

      res.status(200).send({
        message: "Data profile ditambahkan",
        data: datas,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateProfileId: async (req, res, next) => {
    const { id } = req.params.id;
    const profiles = req.body;

    try {
      const search = await prisma.profile.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (search === null || !search) {
        return res.status(400).send({
          status: "Failed",
          message: `Updated profile id ${id} gagal`,
        });
      }
      const datas = await prisma.profile.update({
        where: {
          id: Number(id),
        },
        data: {
          ...profiles,
        },
      });

      res.status(200).send({
        status: "Success",
        message: `Updated profile id ${id} berhasil`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteProfileId: async (req, res) => {
    const { id } = req.params.id;

    try {
      const search = await prisma.profile.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (search === null || !search) {
        return res.status(400).send({
          status: "Failed",
          message: `Deleted profile id ${id} gagal`,
        });
      }

      res.status(200).send({
        status: "Success",
        message: `Deleted profile id ${id} berhasil`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
