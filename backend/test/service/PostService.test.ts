import { ConnectionOptions, createConnection, getConnection } from "typeorm";
import { PostQuestion } from "../../src/entities/PostQuestion";
import { PostQuestionHasTag } from "../../src/entities/PostQuestionHasTag";
import { User } from "../../src/entities/User";
import NoSuchQuestionError from "../../src/graphql/errors/NoSuchQuestionError";
import SearchQuestionInput from "../../src/graphql/inputTypes/SearchQuestionInput";
import PostService from "../../src/graphql/services/PostService";
const DB_CONN_OPTIONS: ConnectionOptions = require("../../ormconfig.json")[
  "development"
];

// beforeAll(async () => {
//   await createConnection(DB_CONN_OPTIONS);
// });

// afterAll(async () => {
//   const connection = getConnection();
//   await connection.close();
// });

// describe("findOneQuestionById", () => {
//   it("있는 id에 대한 조회", async () => {
//     // given
//     const questionId = 1;
//     const mockQuestion = new PostQuestion();
//     mockQuestion.id = questionId;
//     PostQuestion.findOne = jest.fn().mockResolvedValue(mockQuestion);

//     // when
//     const question = await PostService.findOneQuestionById(questionId);

//     // then
//     expect(PostQuestion.findOne).toHaveBeenCalledWith({ id: questionId });
//   });

//   it("없는 id에 대한 조회", async () => {
//     // given
//     const questionId = -1;
//     const maybeUndefined = await PostQuestion.findOne({ id: questionId });
//     expect(maybeUndefined).toBeUndefined();

//     // when
//     const gettingNotExistingQuestion = async () => {
//       await PostService.findOneQuestionById(questionId);
//     };

//     // then
//     await expect(gettingNotExistingQuestion()).rejects.toThrow(
//       NoSuchQuestionError
//     );
//   });
// });

// describe("findAllQuestionsByUserId", () => {
//   it("해당 유저의 글을 모두 가져오는지", async () => {
//     // given
//     const userId = 1;
//     const [questionsByUserIdInDB, count] = await PostQuestion.findAndCount({
//       where: { userId: userId },
//       select: ["id", "userId"],
//     });

//     // when
//     const questionsByUserId = await PostService.findAllQuestionByUserId(userId);

//     // then
//     expect(questionsByUserId.length).toBe(count);
//     expect(questionsByUserId).toMatchObject<PostQuestion[]>(
//       questionsByUserIdInDB
//     );
//   });
// });

// describe("findAllQuestionByArgs", () => {
//   it("TagID를 포함한 검색", async () => {
//     // given
//     const tag1InDB = await PostQuestionHasTag.find({
//       where: { tagId: 1 },
//       select: ["postQuestionId"],
//     });
//     const tag2InDB = await PostQuestionHasTag.find({
//       where: { tagId: 2 },
//       select: ["postQuestionId"],
//     });
//     const tag1InDBArr = tag1InDB.map((obj) => obj.postQuestionId);
//     const tag2InDBArr = tag2InDB.map((obj) => obj.postQuestionId);
//     const tagCombinedArrInDB = tag1InDBArr
//       .filter((id) => tag2InDBArr.includes(id))
//       .sort((a, b) => b - a);

//     // when
//     const inputData = new SearchQuestionInput();
//     inputData.tagIDs = [1, 2];
//     const searchResult = await PostService.findAllQuestionByArgs(inputData);

//     // then
//     const tagCombinedArr = searchResult.map((obj) => obj.id);
//     expect(tagCombinedArr).toStrictEqual(tagCombinedArrInDB);
//   });

//   it("author 인자를 통한 검색", async () => {
//     // given
//     const username = "username_1";
//     const userIdInDB = (
//       await User.findOne({
//         where: { username: username },
//         select: ["id"],
//       })
//     ).id;

//     // when
//     const inputData = new SearchQuestionInput();
//     inputData.author = username;
//     const searchResult = await PostService.findAllQuestionByArgs(inputData);

//     // then
//     expect(searchResult.every((obj) => obj.userId === userIdInDB)).toBe(true);
//   });
// });
