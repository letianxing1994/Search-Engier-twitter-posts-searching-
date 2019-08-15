import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.List;

import Classes.*;
import IndexingLucene.*;
import SearchLucene.*;

public class TW3Main {

	public static void main(String[] args) throws Exception {
		MyIndexReader ixreader = new MyIndexReader();
		// Initialize the MyRetrievalModel
		QueryRetrievalModel model = new QueryRetrievalModel(ixreader);
		// Extract the queries
		ExtractQuery queries = new ExtractQuery();
		StringBuilder input = new StringBuilder();
		for(int i=0;i<args.length;i++) {
			input.append(args[i]);
		}
		queries.addQuery(input.toString());

		//TW1Main tm = new TW1Main();
		//tm.PreProcess();
		//Filedoc fd = tm.fd;
		File f = new File(Classes.Path.ResultTW3+"csv");
		BufferedInputStream bi = new BufferedInputStream(new FileInputStream(f));
        BufferedReader br=new BufferedReader(new InputStreamReader(bi,"utf-8"),10*1024*1024);
        HashSet<String> h = new HashSet<>();
				
		long startTime1 = System.currentTimeMillis();
		while (queries.hasNext()) {
			Query aQuery = queries.next();
			// conduct retrieval on the index for each topic, and return top 25 documents
			List<Document> results = model.retrieveQuery(aQuery, 20);
			if (results != null) {
				int rank = 1;
				for (Document result : results) {
					h.add(result.docno());
					rank++;
				}
			}else {
				System.out.println("No record match your search");
			}
		}
		
		String line = "";
		StringBuilder tempstr = new StringBuilder();
		String temptest = "";
		tempstr.append("{\"results\":[");
		while((line=br.readLine())!=null) {
			if(h.contains(line)) {
				temptest = br.readLine();
				String temptest1 = temptest.substring(0,temptest.indexOf(","));
				String temptest2 = temptest.substring(temptest.indexOf(",")+1,temptest.length());
				tempstr.append("{"+"\"name\":"+temptest1+","+"\"tweet\":"+"\""+temptest2+"\""+"},");
			}
		}
		tempstr.append("],");
		long endTime1 = System.currentTimeMillis(); // end time of running code
		tempstr.append("\"time\":"+(endTime1-startTime1)/60000.0+"}");
		ixreader.Close();
		System.out.println(tempstr.toString());
	}

}
