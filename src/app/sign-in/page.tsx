function SignInPage() {
  return (
    <div className="sign-in-container">
      <h2>로그인 페이지</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">사용자 이름:</label>
          <input type="text" id="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">로그인</button>
      </form>
      <div>
        <button>구글</button>
        <button>카카오</button>
      </div>
    </div>
  );
}
export default SignInPage;
