export interface ProjectTutorial {
  slug: string;
  title: string;
  shortDesc: string;
  stack: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  architecture: string;
  prerequisites: string[];
  installCommands: string;
  folderStructure: string;
  steps: {
    number: number;
    title: string;
    description: string;
    codeFilename?: string;
    codeLanguage?: string;
    code?: string;
  }[];
  exampleIO: {
    input: string;
    output: string;
    explanation: string;
  };
  troubleshooting: { issue: string; solution: string }[];
  limitations: string[];
  securityConsiderations: string[];
}

export const projects: Record<string, ProjectTutorial> = {
  'chat-with-pdf': {
    slug: 'chat-with-pdf',
    title: 'Chat with PDF',
    shortDesc: 'Build an interactive document question-answering app using Python, LangChain, ChromaDB, and Streamlit.',
    stack: ['Python 3.10+', 'LangChain', 'ChromaDB', 'Streamlit', 'OpenAI API / Local LLM'],
    difficulty: 'Beginner',
    estimatedTime: '45 mins',
    architecture: 'PDF Upload ➔ PyPDFLoader ➔ RecursiveCharacterTextSplitter ➔ OpenAI / HuggingFace Embeddings ➔ ChromaDB Vector Store ➔ RetrievalQA Chain ➔ Streamlit Chat UI',
    prerequisites: [
      'Python 3.10 or higher installed',
      'Basic knowledge of Python virtual environments',
      'OpenAI API key (or local Ollama instance)',
    ],
    installCommands: `pip install streamlit langchain langchain-community langchain-openai chromadb pypdf python-dotenv`,
    folderStructure: `chat-with-pdf/
├── app.py              # Main Streamlit application
├── requirements.txt    # Project dependencies
├── .env.example        # Environment variable template
└── README.md           # Setup and usage instructions`,
    steps: [
      {
        number: 1,
        title: 'Environment Configuration and Imports',
        description: 'Set up your API keys using python-dotenv and import the necessary modules from Streamlit, LangChain, and Chroma.',
        codeFilename: 'app.py (Part 1)',
        codeLanguage: 'python',
        code: `import os
import streamlit as st
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
import tempfile

load_dotenv()`,
      },
      {
        number: 2,
        title: 'Document Ingestion and Chunking',
        description: 'Create a function to parse the uploaded PDF and split it into chunks of 1000 characters with 200 character overlap.',
        codeFilename: 'app.py (Part 2)',
        codeLanguage: 'python',
        code: `def process_pdf(uploaded_file):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
        tmp_file.write(uploaded_file.read())
        tmp_path = tmp_file.name

    loader = PyPDFLoader(tmp_path)
    docs = loader.load()
    os.remove(tmp_path)

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_documents(docs)
    return chunks`,
      },
      {
        number: 3,
        title: 'Vector Store & Embeddings Setup',
        description: 'Embed the document chunks and index them into an in-memory ChromaDB vector database.',
        codeFilename: 'app.py (Part 3)',
        codeLanguage: 'python',
        code: `def get_vectorstore(chunks):
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    vectorstore = Chroma.from_documents(chunks, embeddings)
    return vectorstore`,
      },
      {
        number: 4,
        title: 'RAG Retrieval Chain and Streamlit UI',
        description: 'Assemble the conversational prompt, connect the retriever with ChatOpenAI, and render a reactive chat interface.',
        codeFilename: 'app.py (Part 4)',
        codeLanguage: 'python',
        code: `st.set_page_config(page_title="Chat with PDF", page_icon="📄")
st.title("📄 Chat with PDF using RAG")

uploaded_file = st.sidebar.file_uploader("Upload PDF", type="pdf")

if uploaded_file:
    if "vectorstore" not in st.session_state:
        with st.spinner("Processing PDF..."):
            chunks = process_pdf(uploaded_file)
            st.session_state.vectorstore = get_vectorstore(chunks)
            st.sidebar.success(f"Indexed {len(chunks)} chunks!")

    system_prompt = (
        "You are an assistant for question-answering tasks. "
        "Use the following pieces of retrieved context to answer the question. "
        "If you do not know the answer, say that you don't know.\\n\\n{context}"
    )
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{input}"),
    ])

    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    retriever = st.session_state.vectorstore.as_retriever(search_kwargs={"k": 3})
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)

    user_query = st.chat_input("Ask a question about your document:")
    if user_query:
        st.chat_message("user").write(user_query)
        response = rag_chain.invoke({"input": user_query})
        
        with st.chat_message("assistant"):
            st.write(response["answer"])
            with st.expander("View Retrieved Sources"):
                for idx, doc in enumerate(response["context"]):
                    st.caption(f"**Chunk {idx+1} (Page {doc.metadata.get('page', 0) + 1}):**")
                    st.text(doc.page_content[:300] + "...")`,
      },
    ],
    exampleIO: {
      input: 'What are the three main types of cloud computing services discussed in Chapter 2?',
      output: 'Based on the uploaded document (Chapter 2, Page 14), the three primary cloud service models are:\n1. Infrastructure as a Service (IaaS) — provides virtualized computing resources.\n2. Platform as a Service (PaaS) — delivers hardware and software tools over the internet.\n3. Software as a Service (SaaS) — provides full software applications managed by a third party.',
      explanation: 'The retriever extracted chunks from Page 14 with high cosine similarity, and the LLM synthesized the grounded answer with citations.',
    },
    troubleshooting: [
      {
        issue: 'OpenAI RateLimitError or quota exceeded',
        solution: 'Verify your API credits or switch OpenAIEmbeddings to HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2") for 100% free local embeddings.',
      },
      {
        issue: 'Empty text returned from PyPDFLoader on scanned PDFs',
        solution: 'PyPDF extracts digital text layers. For scanned image-based PDFs, integrate OCR via pdf2image and pytesseract or use UnstructuredPDFLoader.',
      },
    ],
    limitations: [
      'Single-session memory by default (in-memory ChromaDB resets on server restart).',
      'Does not extract complex tables or embedded charts into structured Markdown.',
    ],
    securityConsiderations: [
      'Never commit hardcoded API keys; always use .env files with .gitignore.',
      'Sanitize uploaded file paths to prevent directory traversal vulnerabilities.',
    ],
  },

  'conversational-rag': {
    slug: 'conversational-rag',
    title: 'Conversational RAG with Memory',
    shortDesc: 'Implement multi-turn conversational question answering with query reformulation and chat history.',
    stack: ['Python', 'LangChain', 'ChromaDB', 'Chat History Memory', 'OpenAI / Anthropic'],
    difficulty: 'Intermediate',
    estimatedTime: '50 mins',
    architecture: 'Query + Chat History ➔ Contextualize Query Prompt ➔ Standalone Reformulated Question ➔ Vector Retriever ➔ QA Generation Chain ➔ Message History Store',
    prerequisites: [
      'Completion of Basic RAG / Chat with PDF',
      'Understanding of multi-turn chat history vs stateless API calls',
    ],
    installCommands: `pip install langchain langchain-community langchain-openai chromadb`,
    folderStructure: `conversational-rag/
├── main.py
├── memory_store.py
└── requirements.txt`,
    steps: [
      {
        number: 1,
        title: 'The Need for Query Reformulation',
        description: 'When users ask follow-up questions like "What are its main benefits?", the pronoun "its" fails in vector search unless rewritten using chat history.',
        codeFilename: 'main.py (Reformulation Chain)',
        codeLanguage: 'python',
        code: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains import create_history_aware_retriever

llm = ChatOpenAI(model="gpt-4o", temperature=0)

contextualize_q_system_prompt = (
    "Given a chat history and the latest user question "
    "which might reference context in the chat history, "
    "formulate a standalone question which can be understood "
    "without the chat history. Do NOT answer the question, "
    "just reformulate it if needed and otherwise return it as is."
)

contextualize_q_prompt = ChatPromptTemplate.from_messages([
    ("system", contextualize_q_system_prompt),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])

# history_aware_retriever produces a standalone query first!
history_retriever = create_history_aware_retriever(llm, retriever, contextualize_q_prompt)`,
      },
      {
        number: 2,
        title: 'Building the Full History-Aware QA Chain',
        description: 'Connect the history-aware retriever with the answer generation chain and wrap it with RunnableWithMessageHistory.',
        codeFilename: 'main.py (Full Pipeline)',
        codeLanguage: 'python',
        code: `from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

qa_system_prompt = (
    "You are a helpful knowledge assistant. Answer questions using the retrieved context.\\n\\n{context}"
)
qa_prompt = ChatPromptTemplate.from_messages([
    ("system", qa_system_prompt),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])

question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
rag_chain = create_retrieval_chain(history_retriever, question_answer_chain)

# Session-based memory store
store = {}
def get_session_history(session_id: str):
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

conversational_rag = RunnableWithMessageHistory(
    rag_chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="chat_history",
    output_messages_key="answer",
)`,
      },
    ],
    exampleIO: {
      input: 'Turn 1: "What is PostgreSQL?"\nTurn 2: "What indexing methods does it support?"',
      output: 'Turn 2 Reformulation: "What indexing methods does PostgreSQL support?"\nAnswer: PostgreSQL supports B-tree, Hash, GiST, SP-GiST, GIN, and BRIN indexes.',
      explanation: 'The system accurately mapped the pronoun "it" back to "PostgreSQL" from Turn 1 before querying the vector store.',
    },
    troubleshooting: [
      {
        issue: 'Chat history consumes too many tokens over long sessions',
        solution: 'Apply token sliding windowing or summarize older turns with ConversationSummaryBufferMemory.',
      },
    ],
    limitations: [
      'Two LLM calls per turn (one for question rewriting, one for answer synthesis), increasing latency.',
    ],
    securityConsiderations: [
      'Isolate session history by authenticated user ID to prevent cross-tenant data leaks.',
    ],
  },

  'hybrid-rag': {
    slug: 'hybrid-rag',
    title: 'Hybrid Search (BM25 + Dense Vectors)',
    shortDesc: 'Combine lexical keyword search (BM25) with semantic dense vector search using Reciprocal Rank Fusion (RRF).',
    stack: ['Python', 'Rank-BM25', 'ChromaDB / FAISS', 'LangChain EnsembleRetriever'],
    difficulty: 'Intermediate',
    estimatedTime: '40 mins',
    architecture: 'Query ➔ [BM25 Keyword Retriever + Dense Vector Retriever] ➔ Reciprocal Rank Fusion (RRF) ➔ Top Re-ranked Chunks ➔ LLM',
    prerequisites: [
      'Understanding of TF-IDF / BM25 term weighting',
      'Understanding of Dense Embedding Cosine Distance',
    ],
    installCommands: `pip install rank-bm25 chromadb langchain langchain-community langchain-openai`,
    folderStructure: `hybrid-rag/
├── hybrid_pipeline.py
└── sample_docs.json`,
    steps: [
      {
        number: 1,
        title: 'Initialize BM25 and Dense Retrievers',
        description: 'Create both BM25Retriever (for precise keyword matches, acronyms, and error codes) and VectorStoreRetriever (for conceptual similarity).',
        codeFilename: 'hybrid_pipeline.py',
        codeLanguage: 'python',
        code: `from langchain_community.retrievers import BM25Retriever
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.retrievers import EnsembleRetriever
from langchain_core.documents import Document

docs = [
    Document(page_content="Error code 0x80070005 indicates Access Denied in Windows permissions."),
    Document(page_content="Permission issues often occur when services lack administrative privileges."),
    Document(page_content="Database connection timeout error 504 gateway response from Nginx."),
]

# 1. BM25 Lexical Retriever
bm25_retriever = BM25Retriever.from_documents(docs)
bm25_retriever.k = 2

# 2. Dense Semantic Vector Retriever
embeddings = OpenAIEmbeddings()
chroma_db = Chroma.from_documents(docs, embeddings)
dense_retriever = chroma_db.as_retriever(search_kwargs={"k": 2})

# 3. Ensemble Retriever with Reciprocal Rank Fusion (50% weight each)
ensemble_retriever = EnsembleRetriever(
    retrievers=[bm25_retriever, dense_retriever],
    weights=[0.5, 0.5]
)

# Test exact keyword query
results = ensemble_retriever.invoke("0x80070005")
for r in results:
    print(r.page_content)`,
      },
    ],
    exampleIO: {
      input: 'Query: "0x80070005 access error"',
      output: 'Rank 1 Document: "Error code 0x80070005 indicates Access Denied in Windows permissions." (Score boosted by exact BM25 match)',
      explanation: 'Dense embeddings often struggle with arbitrary alphanumeric error codes, but BM25 pins them directly.',
    },
    troubleshooting: [
      {
        issue: 'BM25 returns irrelevant results due to common stop words',
        solution: 'Configure custom tokenizers or stopword filters in Rank-BM25.',
      },
    ],
    limitations: [
      'Requires maintaining both an inverted keyword index and a vector index in sync.',
    ],
    securityConsiderations: [
      'Ensure metadata filtering applies equally to both the BM25 index and the vector store.',
    ],
  },

  'agentic-rag': {
    slug: 'agentic-rag',
    title: 'Agentic RAG with LangGraph',
    shortDesc: 'Build an autonomous RAG agent that evaluates retrieval quality, rewrites queries conditionally, and invokes tools.',
    stack: ['Python', 'LangGraph', 'LangChain', 'Tavily Search API', 'ChromaDB'],
    difficulty: 'Advanced',
    estimatedTime: '60 mins',
    architecture: 'Query ➔ Agent State ➔ Retrieve Node ➔ Grade Documents Node ➔ [If Relevant ➔ Generate Answer] / [If Irrelevant ➔ Rewrite Query ➔ Web Search ➔ Generate]',
    prerequisites: [
      'Understanding of State Graphs (Nodes, Edges, State)',
      'LangGraph core concepts',
    ],
    installCommands: `pip install langgraph langchain langchain-openai tavily-python chromadb`,
    folderStructure: `agentic-rag/
├── graph.py
├── state.py
└── nodes.py`,
    steps: [
      {
        number: 1,
        title: 'Define Graph State',
        description: 'Define the TypedDict representing our graph workflow state.',
        codeFilename: 'state.py',
        codeLanguage: 'python',
        code: `from typing import List, TypedDict

class GraphState(TypedDict):
    question: str
    generation: str
    documents: List[str]
    iteration_count: int`,
      },
      {
        number: 2,
        title: 'Construct Nodes and Conditional Routing in LangGraph',
        description: 'Implement document grading, query rewriting, and the cyclic graph workflow.',
        codeFilename: 'graph.py',
        codeLanguage: 'python',
        code: `from langgraph.graph import END, StateGraph
from state import GraphState

def retrieve(state: GraphState):
    print("---RETRIEVING FROM VECTOR STORE---")
    # Simulation: retrieve docs
    return {"documents": ["Doc 1 context..."]}

def grade_documents(state: GraphState):
    print("---GRADING DOCUMENTS FOR RELEVANCE---")
    # Evaluator LLM checks relevance
    return state

def decide_to_generate(state: GraphState):
    # Conditional edge logic
    if len(state["documents"]) > 0:
        return "generate"
    return "rewrite_query"

workflow = StateGraph(GraphState)
workflow.add_node("retrieve", retrieve)
workflow.add_node("grade_documents", grade_documents)
workflow.set_entry_point("retrieve")
workflow.add_edge("retrieve", "grade_documents")
workflow.add_conditional_edges("grade_documents", decide_to_generate, {
    "generate": END,
    "rewrite_query": "retrieve"
})
app = workflow.compile()`,
      },
    ],
    exampleIO: {
      input: 'Query: "What happened in the latest 2026 AI safety conference?"',
      output: 'Workflow executed: Retrieve (Local Store: 0 relevant hits) ➔ Grade (Failed) ➔ Rewrite Query ➔ Web Search Fallback ➔ Grounded Synthesis.',
      explanation: 'The agent detected that local documents were outdated or irrelevant, autonomously falling back to web search.',
    },
    troubleshooting: [
      {
        issue: 'Infinite graph loop when documents are never deemed relevant',
        solution: 'Enforce a strict maximum iteration counter in GraphState (e.g., max 3 attempts).',
      },
    ],
    limitations: [
      'Higher latency and token usage due to iterative decision-making cycles.',
    ],
    securityConsiderations: [
      'Constrain external web tool access with strict domain whitelisting.',
    ],
  },

  'local-rag': {
    slug: 'local-rag',
    title: '100% Local RAG with Ollama & Chroma',
    shortDesc: 'Run a completely private, offline RAG system with zero external API calls or subscription costs.',
    stack: ['Ollama (Llama 3.2 / Mistral)', 'nomic-embed-text', 'ChromaDB', 'Python', 'LangChain'],
    difficulty: 'Intermediate',
    estimatedTime: '35 mins',
    architecture: 'Local PDF ➔ nomic-embed-text (Local Ollama) ➔ ChromaDB (Local SQLite/Parquet) ➔ Llama-3.2 (Local GPU/CPU) ➔ Completely Private Answer',
    prerequisites: [
      'Ollama installed from ollama.com',
      'Downloaded models: ollama pull llama3.2 && ollama pull nomic-embed-text',
      '8GB+ RAM (16GB recommended for 7B/8B models)',
    ],
    installCommands: `ollama pull llama3.2
ollama pull nomic-embed-text
pip install langchain langchain-community chromadb`,
    folderStructure: `local-rag/
├── local_rag.py
└── data/
    └── company_policy.txt`,
    steps: [
      {
        number: 1,
        title: 'Local Embeddings and Model Setup',
        description: 'Initialize LangChain using local Ollama endpoints on localhost:11434.',
        codeFilename: 'local_rag.py',
        codeLanguage: 'python',
        code: `from langchain_community.llms import Ollama
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import PromptTemplate
from langchain.chains import RetrievalQA

# 1. Local Embeddings via Ollama
embeddings = OllamaEmbeddings(model="nomic-embed-text")

# 2. Local In-Memory ChromaDB
texts = [
    "ACME Corp offers 25 days paid annual leave for all engineers.",
    "Travel expenses under $50 do not require itemized receipts.",
]
vectorstore = Chroma.from_texts(texts, embeddings)

# 3. Local LLM via Ollama
llm = Ollama(model="llama3.2", temperature=0.1)

# 4. Local QA Chain
qa = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(search_kwargs={"k": 1})
)

query = "How much annual leave do engineers get at ACME?"
response = qa.invoke(query)
print("Answer:", response["result"])`,
      },
    ],
    exampleIO: {
      input: '"How much annual leave do engineers get at ACME?"',
      output: '"At ACME Corp, engineers receive 25 days of paid annual leave."',
      explanation: 'Both the embeddings calculation and inference occurred locally on device without transmitting data over the internet.',
    },
    troubleshooting: [
      {
        issue: 'Connection error: Failed to connect to localhost:11434',
        solution: 'Make sure the Ollama background service is running by executing "ollama serve" in a separate terminal.',
      },
    ],
    limitations: [
      'Inference speed depends on local hardware (CPU vs GPU with VRAM).',
    ],
    securityConsiderations: [
      'Ideal for HIPAA, GDPR, and confidential trade-secret document analysis.',
    ],
  },
};
