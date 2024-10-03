import categoryModel from "../models/categoryModel.js";
import roleModel from "../models/roleModel.js";

// create category
export const category = async (req, res) => {
  try {
    const { category, description } = req.body;

    if (!category) {
      return res.status(400).json({
        message: "category required!",
        success: false,
      });
    }

    const newCategory = {
      category,
      description,
    };

    const createdCategory = await categoryModel.create(newCategory);

    return res.status(201).json({
      message: "Category created successfully.",
      category: createdCategory,
      success: false,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! category!",
      success: false,
    });
  }
};

// create role
export const role = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        message: "role required!",
        success: false,
      });
    }

    const newRole = {
      role,
    };

    const createRole = await roleModel.create(newRole);

    return res.status(201).json({
      message: "role created successfully.",
      role: createRole,
      success: false,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! category!",
      success: false,
    });
  }
};
