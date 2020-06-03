<%@page import="java.util.Date"%>
<%@page import="org.apache.commons.fileupload.FileItem"%>
<%@page import="java.util.List"%>
<%@page import="java.io.File"%>
<%@page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
<%@page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>
<%@page import="java.io.FileOutputStream"%>
<%@page import="java.util.Base64"%>
<%@page import="java.nio.channels.FileLock"%>
<%@ page language="java" contentType="text/text; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String saveDir = "N:/workspace/Lecture_javascript/WebContent/upload/";
	String tempDir = "c:/temp/";
	int maxSize = 1024*1024*50;
	String encoding = "utf-8";
	long fileLength = 0l;
	long filepos = 0l;
	String data = "";
	DiskFileItemFactory factory = new DiskFileItemFactory();
	factory.setSizeThreshold(4096);
	factory.setRepository(new File(tempDir) );
	
	ServletFileUpload sf = new ServletFileUpload(factory);
	sf.setHeaderEncoding("utf-8");
	sf.setFileSizeMax(maxSize);	
	
	List<FileItem> list = sf.parseRequest(request);
	for(FileItem fi : list) {
		String v = fi.getString("utf-8");
		String k = fi.getFieldName();
		
		
		if(fi.getSize()>0) {
			String f = fi.getName();
			String sysfile = new Date().getTime() + "-" +f ;
			out.print(f);
			File file = new File(saveDir + sysfile);
			fi.write(file);
			fi.delete();
		}
	}
	
	
%>
