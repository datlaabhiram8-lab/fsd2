import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
      select: false,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['org_admin', 'client', 'team_member'],
        message: '{VALUE} is not a valid role',
      },
      default: 'team_member',
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: [true, 'Organization ID is required'],
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    avatarInitials: {
      type: String,
      trim: true,
      maxlength: 10,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ organizationId: 1, role: 1 });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
