package SearchLucene;

import java.util.ArrayList;

import Classes.Query;

public class ExtractQuery {

	ArrayList<Query> queries;

	int idx = 0;

	public ExtractQuery() {
		// you should extract the 4 queries from the Path.TopicDir
		// NT: the query content of each topic should be 1) tokenized, 2) to
		// lowercase, 3) remove stop words, 4) stemming
		// NT: you can simply pick up title only for query, or you can also use
		// title + description + narrative for the query content.
		queries = new ArrayList<>();
	}
	
	public void addQuery(String content) {
		Query aQuery = new Query();
		aQuery.SetQueryContent(content);
		queries.add(aQuery);
	}

	public boolean hasNext() {
		if (idx == queries.size()) {
			return false;
		} else {
			return true;
		}
	}

	public Query next() {
		return queries.get(idx++);
	}

}
