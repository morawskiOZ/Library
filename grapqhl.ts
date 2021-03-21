const AccountModel = context.mongoose.model("Account");
const account = await AccountModel?.findOne({ userId });
const googleAccessToken = account.get("accessToken");