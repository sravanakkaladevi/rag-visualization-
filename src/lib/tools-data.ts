import { Tool } from './types';

export const tools: Tool[] = [
  {
    slug: 'langchain',
    name: 'LangChain',
    description: 'A comprehensive framework for building LLM-powered applications. It provides abstractions for chains, agents, retrieval, memory, and tool integration, making it one of the most popular frameworks for building RAG pipelines.',
    category: 'framework',
    ragComponent: 'End-to-end pipeline orchestration',
    whenToUse: 'When you need a full-featured framework with extensive integrations for building RAG applications. LangChain offers document loaders, text splitters, embedding wrappers, vector store integrations, and retrieval chains out of the box.',
    example: `from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import RetrievalQA

# Load and chunk documents
loader = PyPDFLoader("document.pdf")
docs = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = splitter.split_documents(docs)

# Create vector store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)

# Build retrieval chain
llm = ChatOpenAI(model="gpt-4")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(),
    return_source_documents=True
)
result = qa_chain.invoke({"query": "What is virtualization?"})`,
    docsUrl: 'https://python.langchain.com/docs/',
    icon: '🦜',
    tags: ['framework', 'python', 'orchestration', 'agents', 'chains'],
  },
  {
    slug: 'llamaindex',
    name: 'LlamaIndex',
    description: 'A data framework designed specifically for building RAG applications. LlamaIndex excels at data ingestion, indexing, and querying, providing high-level abstractions that simplify connecting LLMs with external data sources.',
    category: 'framework',
    ragComponent: 'Data indexing and retrieval',
    whenToUse: 'When your primary focus is connecting LLMs to various data sources and you want a framework optimized for indexing and querying structured and unstructured data.',
    example: `from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# Load documents from a directory
documents = SimpleDirectoryReader("./data").load_data()

# Build index and query engine
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

# Ask questions
response = query_engine.query("Explain the main concepts in these documents")
print(response)`,
    docsUrl: 'https://docs.llamaindex.ai/',
    icon: '🦙',
    tags: ['framework', 'python', 'indexing', 'data-connectors'],
  },
  {
    slug: 'langgraph',
    name: 'LangGraph',
    description: 'A library for building stateful, multi-step agent workflows as graphs. Built on top of LangChain, it enables complex agentic RAG patterns with conditional branching, loops, and human-in-the-loop interactions.',
    category: 'orchestration',
    ragComponent: 'Workflow orchestration for agentic RAG',
    whenToUse: 'When you need to build complex agentic RAG workflows with conditional logic, query rewriting, retrieval evaluation, and iterative refinement steps.',
    example: `from langgraph.graph import StateGraph, END
from typing import TypedDict, List

class RAGState(TypedDict):
    question: str
    documents: List[str]
    generation: str
    retry_count: int

def retrieve(state: RAGState) -> RAGState:
    # Retrieve relevant documents
    docs = retriever.invoke(state["question"])
    return {"documents": docs}

def grade_documents(state: RAGState) -> str:
    # Evaluate if documents are relevant
    if are_relevant(state["documents"], state["question"]):
        return "generate"
    return "rewrite_query"

# Build the graph
workflow = StateGraph(RAGState)
workflow.add_node("retrieve", retrieve)
workflow.add_node("generate", generate_answer)
workflow.add_node("rewrite_query", rewrite)
workflow.add_conditional_edges("retrieve", grade_documents)
app = workflow.compile()`,
    docsUrl: 'https://langchain-ai.github.io/langgraph/',
    icon: '🔀',
    tags: ['orchestration', 'agents', 'workflows', 'graphs'],
  },
  {
    slug: 'chromadb',
    name: 'ChromaDB',
    description: 'An open-source, lightweight embedding database designed for AI applications. ChromaDB makes it easy to store, search, and retrieve embeddings with metadata filtering, and runs in-memory or with persistent storage.',
    category: 'vector-database',
    ragComponent: 'Vector storage and similarity search',
    whenToUse: 'When you need a simple, easy-to-set-up vector database for prototyping or small-to-medium scale RAG applications. ChromaDB is ideal for getting started quickly with minimal configuration.',
    example: `import chromadb

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection("documents")

# Add documents with embeddings
collection.add(
    documents=["Python is a programming language", "Django is a web framework"],
    metadatas=[{"source": "doc1"}, {"source": "doc2"}],
    ids=["id1", "id2"]
)

# Query
results = collection.query(
    query_texts=["What is Python?"],
    n_results=3
)`,
    docsUrl: 'https://docs.trychroma.com/',
    icon: '🎨',
    tags: ['vector-database', 'embeddings', 'python', 'lightweight'],
  },
  {
    slug: 'faiss',
    name: 'FAISS',
    description: 'Facebook AI Similarity Search — a library for efficient similarity search and clustering of dense vectors. FAISS is optimized for speed and memory efficiency, supporting billion-scale vector search with GPU acceleration.',
    category: 'vector-database',
    ragComponent: 'High-performance similarity search',
    whenToUse: 'When you need extremely fast similarity search at scale, especially with GPU acceleration. FAISS is ideal for production systems requiring low-latency retrieval over large vector collections.',
    example: `import faiss
import numpy as np

# Create an index
dimension = 384
index = faiss.IndexFlatL2(dimension)

# Add vectors
vectors = np.random.random((1000, dimension)).astype('float32')
index.add(vectors)

# Search
query = np.random.random((1, dimension)).astype('float32')
distances, indices = index.search(query, k=5)
print(f"Nearest neighbors: {indices}")`,
    docsUrl: 'https://faiss.ai/',
    icon: '⚡',
    tags: ['vector-database', 'similarity-search', 'gpu', 'meta'],
  },
  {
    slug: 'qdrant',
    name: 'Qdrant',
    description: 'A high-performance vector similarity search engine written in Rust. Qdrant provides advanced filtering, payload indexing, and supports both dense and sparse vectors for hybrid search capabilities.',
    category: 'vector-database',
    ragComponent: 'Vector storage with advanced filtering',
    whenToUse: 'When you need a production-ready vector database with advanced filtering capabilities, payload storage, and hybrid search support. Qdrant offers both self-hosted and cloud deployment options.',
    example: `from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

client = QdrantClient(host="localhost", port=6333)

# Create collection
client.create_collection(
    collection_name="documents",
    vectors_config=VectorParams(size=384, distance=Distance.COSINE)
)

# Insert points
client.upsert(
    collection_name="documents",
    points=[
        PointStruct(id=1, vector=[0.1]*384, payload={"text": "Python basics"}),
        PointStruct(id=2, vector=[0.2]*384, payload={"text": "Django tutorial"})
    ]
)`,
    docsUrl: 'https://qdrant.tech/documentation/',
    icon: '🔮',
    tags: ['vector-database', 'rust', 'filtering', 'hybrid-search'],
  },
  {
    slug: 'weaviate',
    name: 'Weaviate',
    description: 'An open-source vector database that supports semantic search, hybrid search, and generative search. Weaviate includes built-in vectorization modules and a GraphQL API for querying.',
    category: 'vector-database',
    ragComponent: 'Vector storage with built-in vectorization',
    whenToUse: 'When you want a vector database with built-in vectorization capabilities, multi-tenancy support, and a rich query API. Weaviate is well-suited for production deployments that need integrated ML model support.',
    example: `import weaviate

client = weaviate.connect_to_local()

# Define a collection
collection = client.collections.create(
    name="Document",
    vectorizer_config=weaviate.classes.config.Configure.Vectorizer.text2vec_openai()
)

# Add objects
collection.data.insert({"content": "RAG combines retrieval with generation"})

# Semantic search
results = collection.query.near_text(query="retrieval augmented generation", limit=3)`,
    docsUrl: 'https://weaviate.io/developers/weaviate',
    icon: '🌐',
    tags: ['vector-database', 'graphql', 'vectorization', 'multi-tenant'],
  },
  {
    slug: 'pinecone',
    name: 'Pinecone',
    description: 'A fully managed, cloud-native vector database service. Pinecone handles infrastructure management, scaling, and provides low-latency similarity search with metadata filtering.',
    category: 'vector-database',
    ragComponent: 'Managed vector storage and search',
    whenToUse: 'When you need a fully managed vector database without the overhead of infrastructure management. Pinecone is ideal for teams that want to focus on application logic rather than database operations.',
    example: `from pinecone import Pinecone

pc = Pinecone(api_key="your-api-key")
index = pc.Index("rag-documents")

# Upsert vectors
index.upsert(vectors=[
    {"id": "doc1", "values": [0.1]*384, "metadata": {"text": "Python guide"}},
    {"id": "doc2", "values": [0.2]*384, "metadata": {"text": "RAG tutorial"}}
])

# Query
results = index.query(vector=[0.15]*384, top_k=3, include_metadata=True)`,
    docsUrl: 'https://docs.pinecone.io/',
    icon: '🌲',
    tags: ['vector-database', 'managed', 'cloud', 'serverless'],
  },
  {
    slug: 'neo4j',
    name: 'Neo4j',
    description: 'The leading graph database platform. In the context of RAG, Neo4j enables knowledge graph-based retrieval where entities and relationships are stored as nodes and edges, enabling graph traversal and relationship-aware retrieval.',
    category: 'vector-database',
    ragComponent: 'Knowledge graph storage and graph-based retrieval',
    whenToUse: 'When your RAG application needs to understand relationships between entities, such as how concepts connect to each other. Neo4j is essential for GraphRAG implementations.',
    example: `from neo4j import GraphDatabase

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "password"))

with driver.session() as session:
    # Create nodes and relationships
    session.run("""
        CREATE (p:Technology {name: 'Python'})
        CREATE (d:Framework {name: 'Django'})
        CREATE (db:Technology {name: 'PostgreSQL'})
        CREATE (p)-[:HAS_FRAMEWORK]->(d)
        CREATE (d)-[:CONNECTS_TO]->(db)
    """)
    
    # Query relationships
    result = session.run("""
        MATCH (t:Technology {name: 'Python'})-[r*1..3]-(connected)
        RETURN connected.name, type(r[0])
    """)`,
    docsUrl: 'https://neo4j.com/docs/',
    icon: '🕸️',
    tags: ['graph-database', 'knowledge-graph', 'cypher', 'relationships'],
  },
  {
    slug: 'elasticsearch',
    name: 'Elasticsearch',
    description: 'A distributed search and analytics engine. In RAG systems, Elasticsearch provides powerful full-text search with BM25 scoring and, in recent versions, dense vector search capabilities for hybrid retrieval.',
    category: 'search-engine',
    ragComponent: 'Full-text search and hybrid retrieval',
    whenToUse: 'When you need powerful keyword search alongside vector search, or when building hybrid RAG systems that combine BM25-based retrieval with dense vector similarity search.',
    example: `from elasticsearch import Elasticsearch

es = Elasticsearch("http://localhost:9200")

# Index a document
es.index(index="documents", body={
    "content": "Retrieval-Augmented Generation enhances LLM responses",
    "embedding": [0.1] * 384
})

# Hybrid search: BM25 + vector
result = es.search(index="documents", body={
    "query": {
        "bool": {
            "should": [
                {"match": {"content": "RAG retrieval"}},
                {"knn": {"field": "embedding", "query_vector": [0.1]*384, "num_candidates": 50}}
            ]
        }
    }
})`,
    docsUrl: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html',
    icon: '🔍',
    tags: ['search-engine', 'bm25', 'hybrid-search', 'distributed'],
  },
  {
    slug: 'haystack',
    name: 'Haystack',
    description: 'An open-source framework by deepset for building production-ready NLP and LLM applications. Haystack provides a pipeline-based architecture for building modular RAG systems with reusable components.',
    category: 'framework',
    ragComponent: 'Pipeline-based RAG orchestration',
    whenToUse: 'When you prefer a component-based pipeline architecture for building RAG systems. Haystack is well-suited for production deployments with its focus on modularity and evaluation tools.',
    example: `from haystack import Pipeline
from haystack.components.retrievers import InMemoryEmbeddingRetriever
from haystack.components.generators import OpenAIGenerator
from haystack.components.builders import PromptBuilder

# Build a RAG pipeline
rag_pipeline = Pipeline()
rag_pipeline.add_component("retriever", InMemoryEmbeddingRetriever(document_store))
rag_pipeline.add_component("prompt_builder", PromptBuilder(template=template))
rag_pipeline.add_component("llm", OpenAIGenerator())

rag_pipeline.connect("retriever", "prompt_builder.documents")
rag_pipeline.connect("prompt_builder", "llm")

result = rag_pipeline.run({"retriever": {"query": "What is RAG?"}})`,
    docsUrl: 'https://docs.haystack.deepset.ai/',
    icon: '🌾',
    tags: ['framework', 'pipeline', 'production', 'evaluation'],
  },
  {
    slug: 'ragflow',
    name: 'RAGFlow',
    description: 'An open-source RAG engine focused on deep document understanding. RAGFlow provides intelligent document parsing, chunking strategies, and a visual pipeline builder for building RAG applications.',
    category: 'platform',
    ragComponent: 'Document processing and RAG pipeline management',
    whenToUse: 'When you need advanced document parsing capabilities including table extraction, layout analysis, and visual document understanding as part of your RAG pipeline.',
    example: `# RAGFlow is typically deployed as a service
# docker compose -f docker-compose.yml up -d

# Access the web UI at http://localhost:9380
# Configure through the visual interface:
# 1. Upload documents
# 2. Select parsing method (naive, book, paper, table, etc.)
# 3. Configure chunking strategy
# 4. Build knowledge base
# 5. Create chat assistant`,
    docsUrl: 'https://ragflow.io/',
    icon: '🌊',
    tags: ['platform', 'document-parsing', 'visual-builder', 'docker'],
  },
  {
    slug: 'dify',
    name: 'Dify',
    description: 'An open-source platform for building LLM applications with a visual workflow editor. Dify provides a no-code/low-code interface for building RAG applications, chatbots, and AI agents.',
    category: 'platform',
    ragComponent: 'Visual RAG application builder',
    whenToUse: 'When you want a visual, low-code platform for building RAG applications rapidly, or when non-developers need to create and manage RAG-powered chatbots.',
    example: `# Dify is deployed as a platform service
# docker compose up -d

# Use the visual workflow builder to:
# 1. Configure knowledge bases with document uploads
# 2. Set up retrieval strategies (vector, keyword, hybrid)
# 3. Design conversation flows
# 4. Connect to various LLM providers
# 5. Deploy as API or embedded chat widget`,
    docsUrl: 'https://docs.dify.ai/',
    icon: '✨',
    tags: ['platform', 'no-code', 'visual-builder', 'workflow'],
  },
  {
    slug: 'ollama',
    name: 'Ollama',
    description: 'A tool for running large language models locally. Ollama simplifies the process of downloading, running, and managing open-source models on your own machine, enabling fully local RAG implementations.',
    category: 'model-runner',
    ragComponent: 'Local LLM inference',
    whenToUse: 'When you want to run RAG systems entirely locally without sending data to external APIs. Ollama is ideal for privacy-sensitive applications and development without API costs.',
    example: `# Install and run a model
# ollama pull llama3.1
# ollama run llama3.1

# Use with Python
import requests

response = requests.post("http://localhost:11434/api/generate", json={
    "model": "llama3.1",
    "prompt": "Based on the following context, answer the question.\\n\\n"
              "Context: Python is a high-level programming language.\\n\\n"
              "Question: What is Python?",
    "stream": False
})
print(response.json()["response"])`,
    docsUrl: 'https://ollama.com/',
    icon: '🦙',
    tags: ['model-runner', 'local', 'privacy', 'open-source'],
  },
  {
    slug: 'sentence-transformers',
    name: 'Sentence Transformers',
    description: 'A Python library by Hugging Face for computing dense vector representations (embeddings) of text. It provides pre-trained models optimized for semantic similarity and search tasks.',
    category: 'embedding',
    ragComponent: 'Text embedding generation',
    whenToUse: 'When you need to generate high-quality text embeddings for your RAG system. Sentence Transformers offers many pre-trained models optimized for different tasks like semantic search, clustering, and paraphrase detection.',
    example: `from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

# Generate embeddings
documents = [
    "RAG combines retrieval with generation",
    "Vector databases store embeddings",
    "LLMs generate human-like text"
]
embeddings = model.encode(documents)

# Compute similarity
from sentence_transformers.util import cos_sim
query_embedding = model.encode("What is RAG?")
similarities = cos_sim(query_embedding, embeddings)
print(f"Most similar: {documents[similarities.argmax()]}")`,
    docsUrl: 'https://www.sbert.net/',
    icon: '🤗',
    tags: ['embedding', 'huggingface', 'semantic-search', 'transformers'],
  },
];

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(t => t.category === category);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug);
}

export const toolCategories = [
  { key: 'framework', label: 'Frameworks', description: 'End-to-end RAG application frameworks' },
  { key: 'vector-database', label: 'Vector Databases', description: 'Storage and retrieval of vector embeddings' },
  { key: 'orchestration', label: 'Orchestration', description: 'Workflow and agent orchestration tools' },
  { key: 'search-engine', label: 'Search Engines', description: 'Full-text and hybrid search solutions' },
  { key: 'platform', label: 'Platforms', description: 'Visual builders and managed RAG platforms' },
  { key: 'model-runner', label: 'Model Runners', description: 'Tools for running LLMs locally' },
  { key: 'embedding', label: 'Embedding Tools', description: 'Libraries for generating text embeddings' },
];
