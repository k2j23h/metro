package metro

func shortToken(token string) string {
	if len(token) < 12 {
		return ""
	}
	return token[0:12]
}

func (token *Token) toShort() string {
	return shortToken(token.GetId())
}
