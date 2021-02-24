class FriendList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendsip(name);
  }
  announceFriendsip(name) {
    global.console.log(`${name} is now a friend`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friend not found!');
    }

    this.friends.splice(idx, 1);
  }
}

describe('FriendList', () => {
  let friendList;

  beforeEach(() => {
    friendList = new FriendList();
  });

  it('initializes friend list', () => {
    expect(friendList.friends.length).toEqual(0);
  });

  it('add a friend to the list', () => {
    friendList.addFriend('Gian');
    expect(friendList.friends.length).toEqual(1);
  });

  it('announces friendship', () => {
    friendList.announceFriendsip = jest.fn();
    expect(friendList.announceFriendsip).not.toHaveBeenCalled();
    friendList.addFriend('Gian');
    expect(friendList.announceFriendsip).toHaveBeenCalled();
  });

  describe('removeFriend', () => {
    it('removes a friend from the list', () => {
      friendList.addFriend('Gian');
      expect(friendList.friends[0]).toEqual('Gian');
      friendList.removeFriend('Gian');
      expect(friendList.friends[0]).toBeUndefined();
    });

    it('throw an error as friends does not exist', () => {
      expect(() => friendList.removeFriend('Gian')).toThrow(
        new Error('Friend not found!'),
      );
    });
  });
});
