// @Packages
import { DataTypes } from 'sequelize';

// Project
import db from '../db';
import { Blogger } from './blogger';
import { Comment } from './comment';

export const Post = db.define('post', {
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

Post.hasMany(Comment, { sourceKey: "id", foreignKey: "post_id", as: "comments", onDelete: 'CASCADE'});
Post.hasOne(Blogger, { sourceKey: "blogger_id", foreignKey: "id", as: "blogger"});