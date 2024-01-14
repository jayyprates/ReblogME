// @Packages
import { DataTypes } from 'sequelize';

// Project
import db from '../db';
import { Blogger } from './blogger';


export const Comment = db.define('comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  content: {
    type: DataTypes.STRING(2000),
    allowNull: false,
  },
  blogger_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

Comment.hasOne(Blogger, { sourceKey: 'blogger_id', foreignKey: "id", as: "blogger"});