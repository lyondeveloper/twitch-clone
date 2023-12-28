import { getSelf } from "./auth-service";
import { db } from "./db";

export const getRecommended = async () => {
  // await new Promise(resolve => setTimeout(resolve, 5000));

  let userId;

  try {
    const self = await getSelf();
    userId = self?.id;
  } catch (error) {
    userId = null;
  }

  let users = [];

  if (userId) {
    // NOT excludes the condition you send to prisma
    // in this case we get all of the users excluding the self user
    users = await db.user.findMany({
      where: {
        NOT: {
          id: userId,
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  return users;
};
