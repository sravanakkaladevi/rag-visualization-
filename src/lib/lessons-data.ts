export interface LessonData {
  slug: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  objectives: string[];
  sections: LessonSection[];
  keyTakeaways: string[];
}

export interface LessonSection {
  id: string;
  title: string;
  level: number;
  content: string;
  code?: { language: string; title?: string; code: string };
  callout?: { type: 'info' | 'tip' | 'warning' | 'danger'; title?: string; content: string };
  diagram?: 'basic-rag' | 'conversational-rag' | 'hybrid-rag' | 'agentic-rag' | 'corrective-rag' | 'self-rag' | 'graphrag' | 'multimodal-rag';
}

export const lessons: Record<string, LessonData> = {
  'rag-fundamentals': {
    slug: 'rag-fundamentals',
    title: 'RAG Fundamentals',
    description: 'Learn what Retrieval-Augmented Generation is, why it matters, and how RAG systems work step by step.',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    objectives: [
      'Understand what Retrieval-Augmented Generation is',
      'Learn why LLMs need external knowledge',
      'Understand the complete RAG pipeline',
      'Identify the key components of a RAG system',
      'Recognize common RAG failure modes',
    ],
    sections: [
      {
        id: 'what-is-rag',
        title: 'What is Retrieval-Augmented Generation?',
        level: 2,
        content: `Retrieval-Augmented Generation (RAG) is an architecture pattern that enhances Large Language Model (LLM) responses by retrieving relevant information from external knowledge sources before generating an answer.

Instead of relying solely on what a model learned during training, RAG systems first search through a collection of documents, databases, or other knowledge sources to find information relevant to the user's question. This retrieved context is then provided to the LLM alongside the question, enabling it to generate more accurate, up-to-date, and verifiable responses.

The term "Retrieval-Augmented Generation" was introduced by Patrick Lewis et al. in their 2020 research paper, which demonstrated that combining a retrieval mechanism with a generative model significantly improves factual accuracy.`,
        callout: { type: 'info', title: 'Key Insight', content: 'Think of RAG as giving an LLM an open-book exam instead of a closed-book exam. The model can look up information before answering, rather than relying entirely on memorized knowledge.' },
      },
      {
        id: 'why-llms-need-rag',
        title: 'Why Do AI Models Need External Knowledge?',
        level: 2,
        content: `Large Language Models are trained on massive datasets, but they have fundamental limitations that RAG addresses:

**Knowledge Cutoff**: LLMs only know information up to their training date. They cannot access information about events, updates, or new research that occurred after training. A model trained in 2023 cannot answer questions about events in 2024.

**Hallucination**: When LLMs encounter questions outside their training data or about topics they have limited knowledge of, they may generate plausible-sounding but factually incorrect information. This is known as hallucination.

**Domain-Specific Knowledge**: LLMs have broad but shallow knowledge. They may not have deep expertise in your specific company's policies, proprietary documentation, or niche technical domains.

**No Source Attribution**: Standard LLM responses don't tell you where the information came from. RAG enables citation of specific source documents, making answers verifiable.

**Data Privacy**: Some organizations cannot send proprietary data to train or fine-tune external models. RAG allows using private data at inference time without modifying the model itself.`,
      },
      {
        id: 'how-rag-works',
        title: 'How RAG Works Step by Step',
        level: 2,
        content: `A RAG system operates in two main phases: **Indexing** (preparing your knowledge base) and **Retrieval & Generation** (answering questions).

**Phase 1: Indexing (Offline)**

1. **Document Loading**: Ingest raw documents from various sources — PDFs, web pages, databases, APIs, or text files. Each document loader handles format-specific parsing and text extraction.

2. **Text Chunking**: Split documents into smaller, semantically meaningful pieces. Large documents are broken into chunks of typically 200–1000 tokens with some overlap between consecutive chunks to preserve context at boundaries.

3. **Embedding Generation**: Convert each text chunk into a dense numerical vector (embedding) using an embedding model. These vectors capture the semantic meaning of the text in a high-dimensional space.

4. **Vector Storage**: Store the embedding vectors along with the original text and metadata in a vector database (such as ChromaDB, Pinecone, or FAISS) optimized for fast similarity search.

**Phase 2: Retrieval & Generation (Online)**

5. **Query Embedding**: When a user asks a question, embed the query using the same embedding model used during indexing.

6. **Similarity Search**: Search the vector database for the chunks most similar to the query embedding. Typically, the top 3–10 most relevant chunks are retrieved.

7. **Context Construction**: Assemble the retrieved chunks into a structured prompt that includes the original question and the retrieved context.

8. **LLM Generation**: Send the prompt to an LLM, which generates an answer grounded in the provided context.

9. **Response Delivery**: Return the answer to the user, optionally with citations pointing to the source documents.`,
        diagram: 'basic-rag',
      },
      {
        id: 'rag-architecture',
        title: 'RAG Architecture Components',
        level: 2,
        content: `A RAG system consists of several interconnected components:

**Document Loaders**: Responsible for ingesting data from various sources. Frameworks like LangChain and LlamaIndex provide loaders for PDFs, CSVs, HTML, databases, and dozens of other formats.

**Text Splitters**: Break documents into chunks. Key parameters include chunk size (number of characters or tokens), chunk overlap (how much consecutive chunks share), and splitting strategy (character-based, sentence-based, or semantic).

**Embedding Models**: Neural networks that convert text into dense vectors. Popular choices include OpenAI's text-embedding-ada-002 (1536 dimensions), Cohere's embed models, and open-source options from Sentence Transformers (e.g., all-MiniLM-L6-v2 with 384 dimensions).

**Vector Stores**: Specialized databases for storing and searching embeddings. Options range from simple in-memory stores (FAISS) to managed cloud services (Pinecone) and self-hosted solutions (Qdrant, Weaviate).

**Retrievers**: Components that take a query and return relevant documents from the vector store. They may apply additional filtering, reranking, or hybrid search strategies.

**LLMs**: The generative models that produce the final answer. These can be API-based (GPT-4, Claude) or locally hosted (Llama, Mistral via Ollama).

**Prompt Templates**: Structured templates that combine the user's question with retrieved context into an effective prompt for the LLM.`,
      },
      {
        id: 'retrieval-evaluation',
        title: 'Retrieval Evaluation',
        level: 2,
        content: `Evaluating the quality of a RAG system involves measuring both retrieval and generation quality:

**Retrieval Metrics**:
- **Precision@K**: Of the top K retrieved documents, how many are actually relevant?
- **Recall@K**: Of all relevant documents in the corpus, how many appear in the top K results?
- **Mean Reciprocal Rank (MRR)**: How high does the first relevant document appear in the results?
- **Normalized Discounted Cumulative Gain (NDCG)**: Measures ranking quality, giving higher weight to relevant documents that appear earlier.

**Generation Metrics**:
- **Faithfulness**: Does the generated answer stay true to the retrieved context?
- **Answer Relevancy**: Does the answer actually address the user's question?
- **Context Relevancy**: Were the retrieved documents actually relevant to the question?

**Evaluation Frameworks**: Tools like RAGAS, DeepEval, and TruLens provide automated evaluation of RAG systems across these dimensions.`,
        callout: { type: 'tip', content: 'Start by manually evaluating 20-50 question-answer pairs before investing in automated evaluation. This helps you understand your system\'s failure patterns.' },
      },
      {
        id: 'common-failure-modes',
        title: 'Common RAG Failure Modes',
        level: 2,
        content: `Understanding common failure modes helps you diagnose and improve your RAG system:

**Poor Chunking**: Chunks that are too small lose context; chunks that are too large dilute relevant information with irrelevant text. Chunks that split mid-sentence or mid-paragraph can confuse the retriever and the LLM.

**Embedding Model Mismatch**: Using an embedding model that doesn't understand your domain's terminology. For example, a general-purpose embedding model may not accurately represent highly technical medical or legal terms.

**Irrelevant Retrieval**: The retrieved documents don't contain information needed to answer the question. This can happen when the question uses different terminology than the documents, or when the vector space doesn't capture the relevant semantic relationships.

**Context Window Overflow**: Retrieving too many documents can exceed the LLM's context window or dilute relevant information with less relevant chunks.

**Lost in the Middle**: Research shows that LLMs pay less attention to information in the middle of long contexts. Important information retrieved in the middle of the context may be effectively ignored.

**Answer Not in Documents**: The user asks a question that genuinely cannot be answered from the available documents. A good RAG system should recognize this and say so, rather than hallucinating.

**Outdated Information**: If documents aren't regularly updated, the RAG system may provide stale information while appearing authoritative.`,
        callout: { type: 'warning', content: 'The most common RAG failure is not a technical bug — it\'s poor chunking strategy. Spend time experimenting with chunk sizes and overlap before optimizing other components.' },
      },
    ],
    keyTakeaways: [
      'RAG enhances LLMs by providing external knowledge at query time',
      'The pipeline consists of indexing (offline) and retrieval+generation (online) phases',
      'Key components include document loaders, chunkers, embedding models, vector stores, and LLMs',
      'Evaluation should cover both retrieval quality and generation faithfulness',
      'Common failures stem from poor chunking, embedding mismatches, and irrelevant retrieval',
    ],
  },

  'basic-rag': {
    slug: 'basic-rag',
    title: 'Basic / Naive RAG',
    description: 'The foundational RAG pattern: load documents, chunk, embed, retrieve, and generate answers.',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    objectives: [
      'Understand the Basic RAG pipeline end-to-end',
      'Learn how to load and process documents',
      'Implement text chunking and embedding',
      'Build a simple retrieval chain',
      'Generate answers grounded in retrieved context',
    ],
    sections: [
      {
        id: 'overview',
        title: 'What is Basic RAG?',
        level: 2,
        content: `Basic RAG (sometimes called Naive RAG) is the simplest and most straightforward implementation of Retrieval-Augmented Generation. It follows a linear pipeline: ingest documents, split them into chunks, generate embeddings, store them in a vector database, and at query time, retrieve the most relevant chunks to provide as context to an LLM.

**Example Scenario**: A student uploads a Cloud Computing PDF and asks, "Explain virtualization." The system loads the PDF, finds the most relevant sections about virtualization, and generates a comprehensive answer based on the document's content.

Basic RAG is the foundation upon which all other RAG approaches build. Understanding it thoroughly is essential before exploring more advanced patterns.`,
        diagram: 'basic-rag',
      },
      {
        id: 'document-ingestion',
        title: 'Step 1: Document Ingestion',
        level: 2,
        content: `Document ingestion is the process of loading raw documents and converting them into a format suitable for processing. Different document types require different loaders:

**PDF Documents**: Libraries like PyPDF2, pdfplumber, or unstructured handle text extraction from PDFs. Some PDFs contain scanned images requiring OCR (Optical Character Recognition).

**Web Pages**: HTML content needs to be parsed and cleaned, removing navigation elements, ads, and boilerplate to extract the main content.

**Structured Data**: CSV, JSON, or database records may need transformation into text format suitable for embedding.

**Metadata Preservation**: Good document loaders preserve metadata like page numbers, document titles, timestamps, and source URLs. This metadata is valuable for source attribution in the final answer.`,
        code: {
          language: 'python',
          title: 'document_loading.py',
          code: `from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import WebBaseLoader

# Load a PDF document
pdf_loader = PyPDFLoader("cloud_computing.pdf")
pdf_docs = pdf_loader.load()
print(f"Loaded {len(pdf_docs)} pages from PDF")

# Each document has content and metadata
for doc in pdf_docs[:2]:
    print(f"Page {doc.metadata['page']}: {doc.page_content[:100]}...")

# Load a web page
web_loader = WebBaseLoader("https://example.com/article")
web_docs = web_loader.load()`,
        },
      },
      {
        id: 'text-chunking',
        title: 'Step 2: Text Chunking',
        level: 2,
        content: `Text chunking splits loaded documents into smaller pieces that are suitable for embedding and retrieval. The chunking strategy significantly impacts the quality of your RAG system.

**Key Parameters**:
- **Chunk Size**: The maximum size of each chunk (typically 200-1500 characters or tokens). Smaller chunks are more precise but lose context; larger chunks provide more context but may include irrelevant information.
- **Chunk Overlap**: How much text is shared between consecutive chunks (typically 50-200 characters). Overlap helps preserve context at chunk boundaries.
- **Splitting Strategy**: How the text is actually divided — by characters, sentences, paragraphs, or semantic boundaries.

**Common Strategies**:
- **RecursiveCharacterTextSplitter**: Tries to split by paragraphs, then sentences, then characters, preserving the most natural boundaries. This is the most commonly recommended approach.
- **SentenceTextSplitter**: Splits at sentence boundaries, ensuring each chunk contains complete sentences.
- **SemanticChunker**: Uses embeddings to identify topic boundaries and split at semantically meaningful points.`,
        code: {
          language: 'python',
          title: 'text_chunking.py',
          code: `from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,       # Maximum chunk size in characters
    chunk_overlap=200,     # Overlap between consecutive chunks
    length_function=len,
    separators=["\\n\\n", "\\n", ". ", " ", ""]  # Try these separators in order
)

chunks = splitter.split_documents(pdf_docs)
print(f"Created {len(chunks)} chunks from {len(pdf_docs)} pages")

# Inspect a chunk
print(f"Chunk size: {len(chunks[0].page_content)} chars")
print(f"Content preview: {chunks[0].page_content[:200]}...")
print(f"Metadata: {chunks[0].metadata}")`,
        },
        callout: { type: 'tip', title: 'Choosing Chunk Size', content: 'Start with 500-1000 characters and 100-200 character overlap. Test with your actual queries and adjust based on retrieval quality. There is no universally optimal chunk size — it depends on your documents and questions.' },
      },
      {
        id: 'embedding-generation',
        title: 'Step 3: Embedding Generation',
        level: 2,
        content: `Embeddings convert text chunks into dense numerical vectors that capture semantic meaning. Similar texts produce vectors that are close together in the embedding space.

**How Embeddings Work**: An embedding model (a neural network) takes a text string as input and produces a fixed-length vector of floating-point numbers. For example, OpenAI's text-embedding-ada-002 produces 1536-dimensional vectors, while the smaller all-MiniLM-L6-v2 produces 384-dimensional vectors.

**Semantic Similarity**: The key property of good embeddings is that semantically similar texts have similar vectors. "The cat sat on the mat" and "A feline rested on the rug" should produce vectors that are close together, even though they share few exact words.

**Choosing an Embedding Model**: Consider:
- Dimensionality (higher dimensions can capture more nuance but require more storage)
- Speed (smaller models are faster)
- Quality (benchmark performance on tasks similar to yours)
- Cost (API-based vs. open-source local models)`,
        code: {
          language: 'python',
          title: 'embeddings.py',
          code: `from langchain_openai import OpenAIEmbeddings
from sentence_transformers import SentenceTransformer

# Option 1: OpenAI embeddings (API-based)
openai_embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
vector = openai_embeddings.embed_query("What is virtualization?")
print(f"OpenAI embedding dimension: {len(vector)}")  # 1536

# Option 2: Open-source embeddings (local)
model = SentenceTransformer('all-MiniLM-L6-v2')
vectors = model.encode(["What is virtualization?", "Cloud computing basics"])
print(f"Local embedding dimension: {vectors.shape[1]}")  # 384

# Compute similarity
from numpy import dot
from numpy.linalg import norm
similarity = dot(vectors[0], vectors[1]) / (norm(vectors[0]) * norm(vectors[1]))
print(f"Cosine similarity: {similarity:.4f}")`,
        },
      },
      {
        id: 'vector-storage',
        title: 'Step 4: Vector Storage & Retrieval',
        level: 2,
        content: `The generated embeddings are stored in a vector database alongside the original text and metadata. When a query arrives, the system embeds the query and performs similarity search to find the most relevant chunks.

**Storage**: Vector databases use specialized indexing structures (like HNSW — Hierarchical Navigable Small World graphs) to enable fast approximate nearest neighbor search over millions or billions of vectors.

**Retrieval**: At query time:
1. The user's question is embedded using the same embedding model
2. The vector database finds the top-k most similar vectors using cosine similarity or other distance metrics
3. The corresponding text chunks and metadata are returned

**Filtering**: Most vector databases support metadata filtering, allowing you to narrow searches by source document, date range, category, or other attributes.`,
        code: {
          language: 'python',
          title: 'vector_store.py',
          code: `from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

# Create vector store from chunks
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db",
    collection_name="cloud_computing"
)

# Retrieve relevant chunks
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 4}  # Return top 4 most relevant chunks
)

# Search
results = retriever.invoke("Explain virtualization")
for i, doc in enumerate(results):
    print(f"\\nResult {i+1} (Page {doc.metadata.get('page', '?')}):")
    print(doc.page_content[:200])`,
        },
      },
      {
        id: 'answer-generation',
        title: 'Step 5: Answer Generation',
        level: 2,
        content: `The final step combines the user's question with retrieved context and sends it to an LLM for answer generation. The prompt template is crucial — it instructs the model to use only the provided context and to acknowledge when the answer isn't available in the retrieved documents.

**Prompt Template Best Practices**:
- Clearly instruct the model to base its answer on the provided context
- Tell the model to say "I don't have enough information" rather than hallucinate
- Include the source metadata for citation purposes
- Keep the prompt focused — don't overload with instructions

**Complete Basic RAG Chain**: The full pipeline connects all components into a single retrieval chain that takes a question and returns an answer with sources.`,
        code: {
          language: 'python',
          title: 'basic_rag_chain.py',
          code: `from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# Define the prompt template
prompt_template = """Use the following context to answer the question. 
If the answer is not in the context, say "I don't have enough information to answer this question."

Context:
{context}

Question: {question}

Answer:"""

PROMPT = PromptTemplate(
    template=prompt_template,
    input_variables=["context", "question"]
)

# Create the QA chain
llm = ChatOpenAI(model="gpt-4", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",  # Stuff all retrieved docs into the prompt
    retriever=retriever,
    return_source_documents=True,
    chain_type_kwargs={"prompt": PROMPT}
)

# Ask a question
result = qa_chain.invoke({"query": "Explain virtualization in cloud computing"})
print("Answer:", result["result"])
print("\\nSources:")
for doc in result["source_documents"]:
    print(f"  - Page {doc.metadata.get('page', '?')}")`,
        },
        callout: { type: 'info', title: 'About chain_type', content: 'The "stuff" chain type puts all retrieved documents into a single prompt. For large numbers of retrieved documents, consider "map_reduce" (summarize each document then combine) or "refine" (iteratively improve the answer with each document).' },
      },
      {
        id: 'limitations',
        title: 'Limitations of Basic RAG',
        level: 2,
        content: `While Basic RAG is a solid starting point, it has several limitations that more advanced approaches address:

**No Conversation Memory**: Basic RAG treats each question independently. It cannot handle follow-up questions like "What about its advantages?" because it doesn't know what "its" refers to. Conversational RAG addresses this.

**Single Retrieval Method**: Basic RAG uses only vector similarity search. It may miss documents that match by exact keywords (like error codes) but aren't semantically similar. Hybrid RAG combines keyword and vector search.

**No Quality Control**: Basic RAG doesn't evaluate whether the retrieved documents are actually relevant. It simply returns the most similar vectors, which may not contain the answer. Corrective RAG and Self-RAG add evaluation steps.

**No Query Refinement**: If the initial query doesn't retrieve good results, Basic RAG has no mechanism to rewrite the query or try alternative search strategies. Agentic RAG adds this capability.

**Text Only**: Basic RAG handles text documents. It cannot process images, charts, or tables within documents. Multimodal RAG extends the approach to multiple modalities.

Despite these limitations, Basic RAG is remarkably effective for many use cases and should be your starting point before adding complexity.`,
      },
    ],
    keyTakeaways: [
      'Basic RAG follows a linear pipeline: Load → Chunk → Embed → Store → Retrieve → Generate',
      'Chunk size and overlap significantly affect retrieval quality — experiment with these parameters',
      'The same embedding model must be used for both indexing and querying',
      'Prompt engineering is critical — instruct the LLM to use only the provided context',
      'Basic RAG is the foundation for all advanced patterns — understand it well before moving on',
    ],
  },

  'conversational-rag': {
    slug: 'conversational-rag',
    title: 'Conversational RAG',
    description: 'Extend RAG with chat history and follow-up question handling for multi-turn conversations.',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    objectives: [
      'Understand why basic RAG fails with follow-up questions',
      'Learn question rewriting techniques',
      'Implement conversation memory in RAG systems',
      'Build a multi-turn RAG chatbot',
    ],
    sections: [
      {
        id: 'overview',
        title: 'What is Conversational RAG?',
        level: 2,
        content: `Conversational RAG extends basic RAG to handle multi-turn conversations. In a basic RAG system, each question is processed independently — the system has no memory of previous interactions. This fails when users ask follow-up questions that reference earlier messages.

**Example:**
- User: "What is Python?"
- Assistant: "Python is a high-level, interpreted programming language known for..."
- User: "What are its advantages?"

In basic RAG, the second question "What are its advantages?" would be sent directly to the retriever. Since the retriever doesn't know what "its" refers to, it would retrieve irrelevant documents. Conversational RAG solves this by rewriting the question to include the necessary context: "What are the advantages of Python?"`,
        diagram: 'conversational-rag',
      },
      {
        id: 'question-rewriting',
        title: 'Question Rewriting',
        level: 2,
        content: `The core technique in Conversational RAG is question rewriting (also called query reformulation or contextualization). Before sending a query to the retriever, an LLM rewrites the question to be self-contained by incorporating relevant context from the chat history.

**How It Works:**
1. The system receives a new question along with the chat history
2. An LLM analyzes the question and the history to determine if the question contains ambiguous references
3. The LLM rewrites the question to be standalone — replacing pronouns and references with explicit terms
4. The rewritten question is used for retrieval

**Example Rewriting:**
- Chat History: [User: "What is Django?", Assistant: "Django is a Python web framework..."]
- New Question: "How does it handle databases?"
- Rewritten: "How does Django handle databases?"

This approach is more efficient than stuffing the entire chat history into the retriever query, which would add noise and reduce retrieval precision.`,
        code: {
          language: 'python',
          title: 'question_rewriting.py',
          code: `from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

llm = ChatOpenAI(model="gpt-4", temperature=0)

contextualize_prompt = ChatPromptTemplate.from_messages([
    ("system", """Given the chat history and the latest user question, 
    reformulate the question to be standalone — it should be understandable 
    without the chat history. Do NOT answer the question, just reformulate it 
    if needed. If it's already standalone, return it unchanged."""),
    ("human", "Chat History:\\n{chat_history}\\n\\nLatest Question: {question}"),
])

# Example usage
chat_history = """User: What is Django?
Assistant: Django is a high-level Python web framework that encourages rapid development."""

question = "How does it handle databases?"

chain = contextualize_prompt | llm
result = chain.invoke({
    "chat_history": chat_history,
    "question": question
})
print(result.content)
# Output: "How does Django handle databases?"`,
        },
      },
      {
        id: 'memory-management',
        title: 'Conversation Memory',
        level: 2,
        content: `Managing conversation history effectively is important for Conversational RAG. You need to decide how much history to retain and how to format it for the LLM.

**Memory Strategies:**

**Buffer Memory**: Store the last N messages verbatim. Simple but can grow large.

**Window Memory**: Keep only the last K conversation turns, discarding older ones. Limits context size but may lose important early context.

**Summary Memory**: Periodically summarize older parts of the conversation, keeping recent messages verbatim. Balances context retention with token efficiency.

**Token-Limited Memory**: Keep as many recent messages as fit within a token budget.

**Practical Considerations:**
- The entire conversation context (history + retrieved documents + question) must fit within the LLM's context window
- Very long histories can dilute retrieval quality — summarize when possible
- Consider which parts of the history are relevant to the current question`,
        code: {
          language: 'python',
          title: 'conversational_rag_chain.py',
          code: `from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferWindowMemory
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import Chroma

llm = ChatOpenAI(model="gpt-4", temperature=0)

# Set up memory (keep last 5 exchanges)
memory = ConversationBufferWindowMemory(
    k=5,
    memory_key="chat_history",
    return_messages=True,
    output_key="answer"
)

# Create conversational retrieval chain
conv_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=vectorstore.as_retriever(search_kwargs={"k": 4}),
    memory=memory,
    return_source_documents=True,
    verbose=True
)

# Multi-turn conversation
response1 = conv_chain.invoke({"question": "What is Python?"})
print("A1:", response1["answer"])

response2 = conv_chain.invoke({"question": "What are its main advantages?"})
print("A2:", response2["answer"])

response3 = conv_chain.invoke({"question": "How does it compare to Java?"})
print("A3:", response3["answer"])`,
        },
        callout: { type: 'tip', content: 'For production systems, persist conversation history in a database rather than in-memory. This allows conversations to resume across sessions and supports analytics.' },
      },
      {
        id: 'conversation-flow',
        title: 'Conversation Flow Architecture',
        level: 2,
        content: `The complete Conversational RAG flow:

1. **User sends a message** — could be a new question or a follow-up
2. **Check if rewriting is needed** — analyze whether the question contains references to earlier messages
3. **Rewrite the question** — if needed, use the LLM to create a standalone version
4. **Retrieve relevant documents** — using the rewritten (standalone) question
5. **Generate answer** — the LLM receives the original question (for natural conversation), the chat history (for conversational context), and the retrieved documents
6. **Update memory** — store the new exchange in conversation history
7. **Return response** — deliver the answer with source citations

This approach preserves the natural conversational flow (users see their original questions) while using optimized standalone queries for retrieval.`,
      },
    ],
    keyTakeaways: [
      'Conversational RAG adds chat history awareness to basic RAG',
      'Question rewriting transforms follow-up questions into standalone queries',
      'Memory management is critical — balance context retention with token limits',
      'The rewritten question is used for retrieval, but the original question maintains conversational flow',
      'Summarization of older history helps keep context within LLM limits',
    ],
  },

  'hybrid-rag': {
    slug: 'hybrid-rag',
    title: 'Hybrid RAG',
    description: 'Combine keyword search (BM25) with dense vector search for more accurate retrieval.',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    objectives: [
      'Understand the limitations of pure vector search',
      'Learn how BM25 keyword search works',
      'Implement hybrid retrieval combining both methods',
      'Apply Reciprocal Rank Fusion to merge results',
    ],
    sections: [
      {
        id: 'overview',
        title: 'What is Hybrid RAG?',
        level: 2,
        content: `Hybrid RAG combines two complementary retrieval methods: **sparse retrieval** (keyword-based, like BM25) and **dense retrieval** (vector-based, using embeddings). Each method has distinct strengths, and combining them produces more robust retrieval.

**Example Scenario**: A developer searches for the exact error code "ERR_CONNECTION_RESET" and also wants semantically related troubleshooting information. Pure vector search might find semantically related documents about connection errors but miss the exact error code match. Pure keyword search would find the exact match but miss related troubleshooting guides that use different terminology. Hybrid search finds both.`,
        diagram: 'hybrid-rag',
      },
      {
        id: 'sparse-vs-dense',
        title: 'Sparse vs Dense Retrieval',
        level: 2,
        content: `**Sparse Retrieval (BM25)**:
- Based on exact term matching with TF-IDF-like scoring
- Excels at matching specific identifiers, names, error codes, and technical terms
- Fast and well-understood; no neural network required
- Struggles with synonyms and paraphrasing ("car" won't match "automobile")
- Represented as sparse vectors (mostly zeros, with non-zero entries for matching terms)

**Dense Retrieval (Vector Search)**:
- Based on semantic similarity using learned embeddings
- Excels at understanding meaning, synonyms, and paraphrased queries
- Can match "climate change effects" with documents about "global warming impact"
- May miss exact identifiers or rare technical terms
- Represented as dense vectors (every dimension has a non-zero value)

**Why Combine Them?**
Neither method alone is sufficient for all query types. Hybrid search leverages the strengths of both:
- BM25 handles exact matches, acronyms, and specific identifiers
- Vector search handles semantic similarity and natural language variation
- Together, they provide more robust retrieval across diverse query types`,
        callout: { type: 'info', title: 'When to Use Hybrid Search', content: 'Hybrid search is particularly valuable when your corpus contains both natural language text and technical identifiers (error codes, product IDs, API names), or when users mix natural language with exact terms in their queries.' },
      },
      {
        id: 'bm25-explained',
        title: 'How BM25 Works',
        level: 2,
        content: `BM25 (Best Matching 25) is a probabilistic ranking function that scores documents based on:

**Term Frequency (TF)**: How often the query term appears in the document. More occurrences generally mean higher relevance, but with diminishing returns (the 10th occurrence matters less than the 1st).

**Inverse Document Frequency (IDF)**: How rare the term is across the entire corpus. Rare terms are more informative than common terms. The word "the" appears everywhere and is nearly useless for retrieval, while "ERR_CONNECTION_RESET" is highly specific.

**Document Length Normalization**: Longer documents naturally contain more term occurrences. BM25 adjusts for this so that a short document containing a term is scored higher than a long document where the same term appears with the same frequency.

The BM25 formula combines these factors with tunable parameters k1 (term frequency saturation) and b (length normalization).`,
        code: {
          language: 'python',
          title: 'bm25_retrieval.py',
          code: `from langchain_community.retrievers import BM25Retriever

# Create BM25 retriever from documents
bm25_retriever = BM25Retriever.from_documents(
    documents=chunks,
    k=4  # Return top 4 results
)

# BM25 excels at exact term matching
results = bm25_retriever.invoke("ERR_CONNECTION_RESET")
for doc in results:
    print(f"Score match: {doc.page_content[:100]}...")`,
        },
      },
      {
        id: 'reciprocal-rank-fusion',
        title: 'Reciprocal Rank Fusion (RRF)',
        level: 2,
        content: `When you have results from multiple retrievers, you need a strategy to merge them into a single ranked list. Reciprocal Rank Fusion (RRF) is the most popular method.

**How RRF Works:**
For each document, RRF calculates a score based on its rank position in each retriever's results:

score(doc) = Σ 1 / (k + rank_i(doc))

Where k is a constant (typically 60) and rank_i is the document's rank in retriever i. Documents ranked highly by multiple retrievers get higher combined scores.

**Why RRF?**
- It doesn't require normalized scores from different retrievers (which use different scoring scales)
- It's simple to implement and robust
- Documents that appear in multiple result sets are naturally boosted
- The constant k prevents the top-ranked result from dominating`,
        code: {
          language: 'python',
          title: 'hybrid_rag.py',
          code: `from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

# Dense retriever (vector search)
vectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())
dense_retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# Sparse retriever (BM25)
sparse_retriever = BM25Retriever.from_documents(chunks, k=4)

# Combine with Ensemble (uses RRF by default)
hybrid_retriever = EnsembleRetriever(
    retrievers=[dense_retriever, sparse_retriever],
    weights=[0.5, 0.5]  # Equal weighting
)

# This retrieves from both and merges results
results = hybrid_retriever.invoke("ERR_CONNECTION_RESET troubleshooting steps")
for doc in results:
    print(f"Hybrid result: {doc.page_content[:100]}...")`,
        },
        callout: { type: 'tip', content: 'Start with equal weights (0.5/0.5) and adjust based on your query patterns. If most queries are natural language, weight dense retrieval higher. If queries often contain exact identifiers, weight BM25 higher.' },
      },
      {
        id: 'reranking',
        title: 'Optional: Reranking',
        level: 2,
        content: `After combining results from multiple retrievers, a reranking step can further improve result quality. A cross-encoder reranker takes each query-document pair and produces a precise relevance score.

**Why Rerank?**
- First-stage retrievers (both BM25 and embedding search) are optimized for speed over precision
- Cross-encoders are much more accurate because they process the query and document jointly
- Reranking a small set of candidates (e.g., top 20) is computationally feasible

**Popular Rerankers:**
- Cohere Rerank API
- Cross-encoder models from Sentence Transformers (e.g., cross-encoder/ms-marco-MiniLM-L-6-v2)
- Jina Reranker`,
        code: {
          language: 'python',
          title: 'reranking.py',
          code: `from sentence_transformers import CrossEncoder

# Load a cross-encoder reranker
reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

# Get initial results from hybrid retriever
initial_results = hybrid_retriever.invoke(query)

# Score each document against the query
pairs = [(query, doc.page_content) for doc in initial_results]
scores = reranker.predict(pairs)

# Sort by reranker score
reranked = sorted(zip(scores, initial_results), key=lambda x: x[0], reverse=True)

# Use top results for generation
top_docs = [doc for _, doc in reranked[:4]]`,
        },
      },
    ],
    keyTakeaways: [
      'Hybrid RAG combines keyword (BM25) and vector search for more robust retrieval',
      'BM25 excels at exact term matching; vector search excels at semantic similarity',
      'Reciprocal Rank Fusion (RRF) merges ranked lists without requiring score normalization',
      'Optional reranking with cross-encoders further improves retrieval precision',
      'Hybrid search is especially valuable when queries mix natural language with identifiers',
    ],
  },

  'agentic-rag': {
    slug: 'agentic-rag',
    title: 'Agentic RAG',
    description: 'Build AI agents that decide when and how to retrieve, using tools and conditional workflows.',
    difficulty: 'advanced',
    estimatedMinutes: 35,
    objectives: [
      'Understand the agent paradigm for RAG',
      'Learn how agents make retrieval decisions',
      'Implement conditional workflows with LangGraph',
      'Build query rewriting and iterative search patterns',
    ],
    sections: [
      {
        id: 'overview',
        title: 'What is Agentic RAG?',
        level: 2,
        content: `Agentic RAG replaces the fixed pipeline of Basic RAG with an intelligent agent that can make dynamic decisions about when and how to retrieve information. Instead of always following the same retrieve-then-generate pattern, an agent can:

- Decide whether retrieval is needed at all
- Choose which tools or data sources to query
- Evaluate the quality of retrieved results
- Rewrite queries when initial retrieval fails
- Perform multiple rounds of retrieval
- Combine information from different sources
- Decide when it has enough information to generate an answer

**Example Scenario**: An AI research assistant receives a complex question. It searches the document collection, evaluates whether the results are sufficient, rewrites the query to be more specific when needed, performs another retrieval, and only generates an answer when it has gathered enough relevant evidence.`,
        diagram: 'agentic-rag',
        callout: { type: 'warning', title: 'Agent Behavior is Defined by the Workflow', content: 'The agent\'s capabilities depend entirely on the tools, prompts, and workflow logic you implement. An "agentic" system is only as smart as its design — it does not automatically know how to handle every situation.' },
      },
      {
        id: 'agent-architecture',
        title: 'Agent Architecture',
        level: 2,
        content: `An agentic RAG system typically consists of:

**Agent Core**: The LLM that acts as the decision-maker, interpreting queries and choosing actions based on the current state.

**Tools**: Functions the agent can call, such as:
- Document retriever (search the vector store)
- Web search (for external information)
- Calculator or code executor (for computational questions)
- Database query tool (for structured data)

**State Management**: Tracks the current conversation state, retrieved documents, attempted queries, and evaluation results.

**Routing Logic**: Conditional logic that determines the next step based on the current state. For example:
- If retrieved documents are relevant → generate answer
- If retrieved documents are irrelevant → rewrite query and retry
- If the question is simple → answer directly without retrieval
- If the question requires multiple sources → perform multiple retrievals

**Stopping Conditions**: Criteria for when the agent should stop iterating:
- Sufficient relevant documents found
- Maximum number of retries reached
- Confidence threshold met`,
      },
      {
        id: 'langgraph-implementation',
        title: 'Implementation with LangGraph',
        level: 2,
        content: `LangGraph is a library for building stateful, graph-based agent workflows. It represents the workflow as a directed graph where nodes are processing steps and edges define the flow (including conditional edges for branching).

**Why LangGraph?**
- Explicit control flow (no magic — you define every step)
- State management built-in
- Conditional routing between steps
- Support for loops and iterative refinement
- Debugging and visualization tools

The following example builds an agentic RAG workflow that:
1. Receives a question
2. Retrieves documents
3. Evaluates document relevance
4. Either generates an answer (if relevant) or rewrites the query and retries`,
        code: {
          language: 'python',
          title: 'agentic_rag.py',
          code: `from langgraph.graph import StateGraph, END
from typing import TypedDict, List, Annotated
from langchain_core.documents import Document

class AgentState(TypedDict):
    question: str
    documents: List[Document]
    generation: str
    retry_count: int
    rewritten_question: str

def retrieve(state: AgentState) -> dict:
    """Retrieve documents for the current question."""
    query = state.get("rewritten_question") or state["question"]
    docs = retriever.invoke(query)
    return {"documents": docs}

def grade_documents(state: AgentState) -> str:
    """Evaluate if retrieved documents are relevant."""
    question = state["question"]
    docs = state["documents"]
    
    # Use LLM to evaluate relevance
    relevant = evaluate_relevance(question, docs)
    
    if relevant:
        return "generate"
    elif state.get("retry_count", 0) >= 2:
        return "generate"  # Give up retrying, use what we have
    else:
        return "rewrite"

def rewrite_query(state: AgentState) -> dict:
    """Rewrite the question for better retrieval."""
    question = state["question"]
    retry = state.get("retry_count", 0) + 1
    
    rewritten = llm.invoke(
        f"Rewrite this question to be more specific for document search: {question}"
    ).content
    
    return {"rewritten_question": rewritten, "retry_count": retry}

def generate(state: AgentState) -> dict:
    """Generate answer from retrieved documents."""
    docs_text = "\\n\\n".join(d.page_content for d in state["documents"])
    answer = llm.invoke(
        f"Context: {docs_text}\\n\\nQuestion: {state['question']}\\n\\nAnswer:"
    ).content
    return {"generation": answer}

# Build the graph
workflow = StateGraph(AgentState)
workflow.add_node("retrieve", retrieve)
workflow.add_node("rewrite", rewrite_query)
workflow.add_node("generate", generate)

workflow.set_entry_point("retrieve")
workflow.add_conditional_edges(
    "retrieve",
    grade_documents,
    {"generate": "generate", "rewrite": "rewrite"}
)
workflow.add_edge("rewrite", "retrieve")  # Retry after rewriting
workflow.add_edge("generate", END)

app = workflow.compile()
result = app.invoke({"question": "How does Django connect to databases?"})`,
        },
      },
      {
        id: 'routing-strategies',
        title: 'Routing Strategies',
        level: 2,
        content: `Agents can use different strategies to route queries:

**LLM-Based Routing**: Use the LLM to classify the question and determine the best action. This is flexible but adds latency (an extra LLM call).

**Rule-Based Routing**: Use heuristic rules (keyword matching, question type classification) to route queries. Faster but less flexible.

**Hybrid Routing**: Combine rules for obvious cases with LLM-based routing for ambiguous queries.

**Multi-Source Routing**: Direct queries to different data sources based on the topic. For example:
- Technical questions → documentation vector store
- Policy questions → policy database
- Current events → web search

The routing mechanism should also handle edge cases:
- Questions that don't need retrieval (general knowledge, greetings)
- Questions that require multiple data sources
- Questions that are out of scope for the system`,
      },
    ],
    keyTakeaways: [
      'Agentic RAG uses intelligent agents that make dynamic retrieval decisions',
      'LangGraph provides a graph-based framework for building agent workflows',
      'Agents can evaluate retrieval quality, rewrite queries, and iterate',
      'Routing strategies determine how and where to search for information',
      'Agent behavior depends on the implemented workflow — it\'s not magic',
    ],
  },

  'corrective-rag': {
    slug: 'corrective-rag',
    title: 'Corrective RAG (CRAG)',
    description: 'Evaluate retrieved documents and take corrective actions when retrieval quality is insufficient.',
    difficulty: 'advanced',
    estimatedMinutes: 30,
    objectives: [
      'Understand the CRAG framework and its motivation',
      'Learn how to evaluate retrieval quality',
      'Implement corrective actions for poor retrieval',
      'Distinguish CRAG from ordinary agentic RAG',
    ],
    sections: [
      {
        id: 'overview',
        title: 'What is Corrective RAG?',
        level: 2,
        content: `Corrective RAG (CRAG) is a framework that adds a retrieval evaluation step to the RAG pipeline. Before generating an answer, CRAG evaluates whether the retrieved documents are relevant enough to answer the question. Based on this evaluation, it takes one of three actions:

1. **Correct** — Retrieved documents are relevant → proceed to generate
2. **Incorrect** — Retrieved documents are irrelevant → try alternative retrieval (e.g., web search) or refine the query
3. **Ambiguous** — Some documents are relevant, some aren't → filter to keep only relevant ones, optionally supplement with additional retrieval

**Example Scenario**: A support assistant retrieves troubleshooting documents for a customer's question about a specific error. The evaluator determines that the retrieved documents discuss a different error entirely. Instead of generating a misleading answer, CRAG triggers an alternative search strategy to find more relevant documents.`,
        diagram: 'corrective-rag',
      },
      {
        id: 'retrieval-evaluation',
        title: 'Retrieval Quality Evaluation',
        level: 2,
        content: `The core innovation in CRAG is the retrieval evaluator — a component that assesses whether retrieved documents contain information relevant to the query.

**Evaluation Approaches:**

**LLM-Based Evaluation**: Use a language model to score each retrieved document's relevance to the query. The LLM reads the query and document and outputs a relevance judgment (e.g., "relevant", "partially relevant", or "irrelevant").

**Threshold-Based**: Set a minimum similarity score threshold. Documents below the threshold are considered irrelevant.

**Cross-Encoder Scoring**: Use a cross-encoder model to compute precise relevance scores for each query-document pair.

The evaluation result determines the corrective action:
- All documents relevant → proceed with generation (Correct)
- No documents relevant → trigger alternative retrieval (Incorrect)
- Mixed relevance → filter to relevant documents only, optionally search for more (Ambiguous)`,
        code: {
          language: 'python',
          title: 'retrieval_evaluation.py',
          code: `from langchain_openai import ChatOpenAI

evaluator_llm = ChatOpenAI(model="gpt-4", temperature=0)

def evaluate_document_relevance(question: str, document: str) -> str:
    """Evaluate if a document is relevant to the question.
    Returns: 'relevant', 'partially_relevant', or 'irrelevant'
    """
    response = evaluator_llm.invoke(
        f"""Evaluate whether the following document contains information 
        relevant to answering the question.

        Question: {question}
        Document: {document}

        Respond with exactly one word: 'relevant', 'partially_relevant', or 'irrelevant'."""
    )
    return response.content.strip().lower()

def grade_retrieval(question: str, documents: list) -> str:
    """Grade the overall retrieval quality."""
    grades = [evaluate_document_relevance(question, doc.page_content) 
              for doc in documents]
    
    relevant_count = grades.count('relevant') + grades.count('partially_relevant')
    
    if relevant_count == len(documents):
        return "correct"
    elif relevant_count == 0:
        return "incorrect"
    else:
        return "ambiguous"`,
        },
      },
      {
        id: 'corrective-actions',
        title: 'Corrective Actions',
        level: 2,
        content: `Based on the evaluation result, CRAG takes different corrective actions:

**When Correct (All Relevant):**
- Proceed directly to answer generation
- Use all retrieved documents as context
- This is the same as basic RAG for this particular query

**When Incorrect (None Relevant):**
- The internal knowledge base doesn't contain the needed information
- Option 1: Query an alternative source (e.g., web search)
- Option 2: Rewrite the query and retry internal retrieval
- Option 3: Acknowledge that the question cannot be answered from available sources
- Note: External search is optional and should only be used when configured

**When Ambiguous (Mixed Relevance):**
- Filter out irrelevant documents
- Optionally supplement with additional retrieval using a refined query
- Proceed with only the relevant subset

**Key Distinction from Agentic RAG:** While CRAG and Agentic RAG both evaluate retrieval quality, CRAG specifically formalizes the three-way classification (correct/incorrect/ambiguous) and defines structured corrective actions for each case. Agentic RAG is a broader concept where an agent has general decision-making capabilities.`,
        callout: { type: 'warning', title: 'External Search is Optional', content: 'The original CRAG paper proposes web search as a fallback, but this is not always appropriate. For enterprise systems handling sensitive data, external search may be disabled. The corrective mechanism should be configurable.' },
      },
      {
        id: 'crag-implementation',
        title: 'CRAG Implementation',
        level: 2,
        content: `Here is a complete CRAG implementation using LangGraph that demonstrates the corrective workflow:`,
        code: {
          language: 'python',
          title: 'corrective_rag.py',
          code: `from langgraph.graph import StateGraph, END
from typing import TypedDict, List
from langchain_core.documents import Document

class CRAGState(TypedDict):
    question: str
    documents: List[Document]
    filtered_documents: List[Document]
    web_results: List[Document]
    grade: str
    generation: str

def retrieve(state: CRAGState) -> dict:
    docs = retriever.invoke(state["question"])
    return {"documents": docs}

def evaluate(state: CRAGState) -> dict:
    grade = grade_retrieval(state["question"], state["documents"])
    return {"grade": grade}

def route_by_grade(state: CRAGState) -> str:
    if state["grade"] == "correct":
        return "generate"
    elif state["grade"] == "incorrect":
        return "web_search"
    else:  # ambiguous
        return "filter_and_supplement"

def filter_documents(state: CRAGState) -> dict:
    filtered = [doc for doc in state["documents"]
                if evaluate_document_relevance(state["question"], doc.page_content) 
                in ("relevant", "partially_relevant")]
    return {"filtered_documents": filtered}

def web_search(state: CRAGState) -> dict:
    # Optional: search the web for additional context
    # Only if external search is configured
    web_docs = web_search_tool.invoke(state["question"])
    return {"web_results": web_docs}

def generate(state: CRAGState) -> dict:
    # Use filtered docs if available, otherwise original docs
    docs = state.get("filtered_documents") or state["documents"]
    web = state.get("web_results", [])
    all_docs = docs + web
    
    context = "\\n\\n".join(d.page_content for d in all_docs)
    answer = llm.invoke(
        f"Context: {context}\\n\\nQuestion: {state['question']}\\n\\nAnswer:"
    ).content
    return {"generation": answer}

# Build CRAG workflow
workflow = StateGraph(CRAGState)
workflow.add_node("retrieve", retrieve)
workflow.add_node("evaluate", evaluate)
workflow.add_node("filter_and_supplement", filter_documents)
workflow.add_node("web_search", web_search)
workflow.add_node("generate", generate)

workflow.set_entry_point("retrieve")
workflow.add_edge("retrieve", "evaluate")
workflow.add_conditional_edges("evaluate", route_by_grade, {
    "generate": "generate",
    "web_search": "web_search",
    "filter_and_supplement": "filter_and_supplement",
})
workflow.add_edge("filter_and_supplement", "generate")
workflow.add_edge("web_search", "generate")
workflow.add_edge("generate", END)

crag_app = workflow.compile()`,
        },
      },
    ],
    keyTakeaways: [
      'CRAG adds a retrieval evaluation step before answer generation',
      'Three evaluation outcomes: Correct (proceed), Incorrect (alternative search), Ambiguous (filter)',
      'Corrective actions are structured and configurable',
      'External search is optional — not all systems should query the web',
      'CRAG is a specific pattern within the broader agentic RAG concept',
    ],
  },

  'self-rag': {
    slug: 'self-rag',
    title: 'Self-RAG',
    description: 'A self-reflective approach that evaluates its own retrieval and generation decisions.',
    difficulty: 'advanced',
    estimatedMinutes: 35,
    objectives: [
      'Understand Self-RAG\'s self-reflection mechanisms',
      'Learn the four types of reflection tokens',
      'Implement retrieval and generation quality checks',
      'Distinguish full Self-RAG from simplified approximations',
    ],
    sections: [
      {
        id: 'overview',
        title: 'What is Self-RAG?',
        level: 2,
        content: `Self-RAG is an approach where the language model itself learns to decide when to retrieve, evaluates whether retrieved evidence supports its claims, and assesses the quality of its own generated response. It introduces a self-reflective loop into the RAG process.

**Example Scenario**: A technical assistant receives a question about a complex topic. Instead of blindly retrieving and generating, Self-RAG:
1. Decides whether retrieval is needed for this particular question
2. Retrieves documents and evaluates whether they are relevant
3. Generates a response segment
4. Checks whether the generated text is supported by the evidence
5. Evaluates overall response quality
6. May regenerate or adjust based on self-evaluation

The key insight is that not every question requires retrieval, and not every retrieved document is useful. Self-RAG makes these decisions explicitly.`,
        diagram: 'self-rag',
        callout: { type: 'danger', title: 'Full Self-RAG vs Approximations', content: 'The original Self-RAG paper (Asai et al., 2023) trains the model to generate special reflection tokens. A simplified version uses separate LLM calls to approximate these evaluations. The simplified version is useful but doesn\'t capture all the benefits of the trained approach.' },
      },
      {
        id: 'reflection-tokens',
        title: 'Self-Reflection Mechanisms',
        level: 2,
        content: `Self-RAG introduces four types of self-reflection:

**1. Retrieve Decision** — Should I retrieve documents for this question?
- Some questions can be answered from the model's knowledge (e.g., "What year did World War II end?")
- Complex or domain-specific questions benefit from retrieval
- The model outputs a decision: "retrieve" or "no_retrieve"

**2. Relevance Assessment (ISREL)** — Are the retrieved documents relevant?
- For each retrieved document, assess whether it contains information relevant to the query
- Documents rated as irrelevant can be discarded
- Similar to CRAG's evaluation step

**3. Support Assessment (ISSUP)** — Does the evidence support the generated claim?
- After generating a response segment, check whether it is supported by the retrieved evidence
- Categories: "fully supported", "partially supported", "not supported"
- Unsupported claims indicate potential hallucination

**4. Utility Assessment (ISUSE)** — Is the overall response useful?
- Evaluate the complete generated response for relevance, completeness, and quality
- Scores typically range from 1-5
- Low utility triggers regeneration`,
      },
      {
        id: 'simplified-implementation',
        title: 'Simplified Self-RAG Implementation',
        level: 2,
        content: `A practical approximation of Self-RAG uses separate LLM calls to perform the reflection steps. While not as efficient as the trained approach, it demonstrates the core concepts:`,
        code: {
          language: 'python',
          title: 'self_rag.py',
          code: `from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4", temperature=0)

def should_retrieve(question: str) -> bool:
    """Decide if retrieval is needed."""
    response = llm.invoke(
        f"""Does this question require looking up specific documents 
        or information to answer accurately? 
        Question: {question}
        Answer with 'yes' or 'no'."""
    )
    return "yes" in response.content.lower()

def check_relevance(question: str, document: str) -> bool:
    """Check if a document is relevant (ISREL)."""
    response = llm.invoke(
        f"""Is this document relevant to answering the question?
        Question: {question}
        Document: {document}
        Answer 'relevant' or 'irrelevant'."""
    )
    return "relevant" in response.content.lower()

def check_support(claim: str, evidence: str) -> str:
    """Check if evidence supports a claim (ISSUP)."""
    response = llm.invoke(
        f"""Does the evidence support this claim?
        Claim: {claim}
        Evidence: {evidence}
        Answer: 'fully_supported', 'partially_supported', or 'not_supported'."""
    )
    return response.content.strip().lower()

def check_utility(question: str, answer: str) -> int:
    """Rate the utility of the answer (ISUSE), 1-5."""
    response = llm.invoke(
        f"""Rate how well this answer addresses the question (1-5).
        Question: {question}
        Answer: {answer}
        Rating (just the number):"""
    )
    try:
        return int(response.content.strip())
    except ValueError:
        return 3

def self_rag_pipeline(question: str) -> str:
    # Step 1: Decide if retrieval is needed
    if should_retrieve(question):
        docs = retriever.invoke(question)
        
        # Step 2: Filter relevant documents
        relevant_docs = [d for d in docs if check_relevance(question, d.page_content)]
        
        if not relevant_docs:
            return "I don't have sufficient information to answer this question."
        
        context = "\\n".join(d.page_content for d in relevant_docs)
    else:
        context = ""
    
    # Step 3: Generate answer
    prompt = f"Context: {context}\\n\\nQuestion: {question}\\n\\nAnswer:" if context else f"Question: {question}\\n\\nAnswer:"
    answer = llm.invoke(prompt).content
    
    # Step 4: Check support and utility
    if context:
        support = check_support(answer, context)
        if support == "not_supported":
            # Regenerate with stricter grounding instruction
            answer = llm.invoke(
                f"Based ONLY on this context, answer the question. "
                f"If the context doesn't contain the answer, say so.\\n"
                f"Context: {context}\\nQuestion: {question}\\nAnswer:"
            ).content
    
    utility = check_utility(question, answer)
    if utility <= 2:
        answer += "\\n\\n(Note: This answer may be incomplete. Consider refining your question.)"
    
    return answer`,
        },
        callout: { type: 'info', content: 'This simplified implementation uses 4-6 LLM calls per query, which adds latency and cost. The original Self-RAG trains a single model to generate reflection tokens inline, making it much more efficient.' },
      },
    ],
    keyTakeaways: [
      'Self-RAG adds self-reflection at multiple stages: retrieval decision, relevance, support, and utility',
      'The model evaluates whether its own generated claims are supported by evidence',
      'Full Self-RAG uses trained reflection tokens; simplified versions use separate LLM calls',
      'Self-RAG is particularly valuable when hallucination reduction is critical',
      'The approach adds overhead — use it when answer quality justifies the added latency',
    ],
  },

  'graphrag': {
    slug: 'graphrag',
    title: 'GraphRAG',
    description: 'Use knowledge graphs to capture entity relationships for relationship-aware retrieval.',
    difficulty: 'advanced',
    estimatedMinutes: 35,
    objectives: [
      'Understand knowledge graphs and their role in RAG',
      'Learn entity and relationship extraction',
      'Implement graph-based retrieval with Neo4j',
      'Compare GraphRAG with vector search approaches',
    ],
    sections: [
      {
        id: 'overview',
        title: 'What is GraphRAG?',
        level: 2,
        content: `GraphRAG uses knowledge graphs — structured representations of entities and their relationships — instead of or alongside vector-based retrieval. While vector search treats documents as isolated chunks, GraphRAG captures how concepts connect to each other, enabling relationship-aware retrieval.

**Example Scenario**: A student asks, "How does Django connect Python code to a database?" In a vector-based system, relevant chunks about Django, Python, and databases might be retrieved separately. In GraphRAG, the system can traverse the knowledge graph:

- **Python** → [HAS_FRAMEWORK] → **Django**
- **Django** → [INCLUDES] → **Django ORM**
- **Django ORM** → [CONNECTS_TO] → **Database**
- **Django ORM** → [USES] → **Models**

This traversal provides structured, relationship-aware context that helps the LLM generate a more coherent answer about how these components connect.`,
        diagram: 'graphrag',
      },
      {
        id: 'knowledge-graphs',
        title: 'Knowledge Graphs Explained',
        level: 2,
        content: `A knowledge graph consists of:

**Entities (Nodes)**: Concepts, objects, or things. Examples: "Python", "Django", "PostgreSQL", "ORM"

**Relationships (Edges)**: Connections between entities with labeled types. Examples: "HAS_FRAMEWORK", "CONNECTS_TO", "USED_BY"

**Properties**: Attributes attached to entities or relationships. Examples: Entity "Django" has property "version: 4.2"

**Why Knowledge Graphs for RAG?**
- **Multi-hop reasoning**: Answer questions that require connecting information across multiple documents
- **Structural understanding**: Capture hierarchies, dependencies, and associations
- **Disambiguation**: Distinguish between entities with the same name based on their relationships
- **Community detection**: Identify clusters of related concepts for summarization

**When GraphRAG is More Useful Than Vector Search:**
- Questions about relationships between concepts
- Multi-hop reasoning (connecting A to C through B)
- Queries requiring structural understanding (hierarchies, dependencies)
- When the knowledge base has rich entity relationships

**When Vector Search is Sufficient:**
- Direct factual questions answerable from a single chunk
- Keyword or semantic matching
- When the knowledge base is primarily narrative text without strong entity relationships`,
      },
      {
        id: 'entity-extraction',
        title: 'Entity and Relationship Extraction',
        level: 2,
        content: `Building a knowledge graph from documents requires extracting entities and relationships. This can be done with LLMs or specialized NLP models.

**LLM-Based Extraction**: Use a language model to identify entities and relationships from text. This is flexible and handles diverse text but can be expensive at scale.

**NER + Relation Extraction**: Use dedicated Named Entity Recognition and relation extraction models. More efficient but may require domain-specific training.`,
        code: {
          language: 'python',
          title: 'entity_extraction.py',
          code: `from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4", temperature=0)

def extract_entities_and_relations(text: str) -> dict:
    """Extract entities and relationships from text using LLM."""
    response = llm.invoke(
        f"""Extract all entities and relationships from the following text.
        
        Format each relationship as: (Entity1) -[RELATIONSHIP_TYPE]-> (Entity2)
        
        Also list each unique entity with a brief description.
        
        Text: {text}
        
        Entities:
        Relationships:"""
    )
    return response.content

text = """Django is a high-level Python web framework. It uses an ORM 
(Object-Relational Mapping) to connect Python objects to database tables. 
Django supports PostgreSQL, MySQL, and SQLite databases."""

result = extract_entities_and_relations(text)
print(result)
# Expected output:
# Entities:
# - Django: A high-level Python web framework
# - Python: Programming language
# - ORM: Object-Relational Mapping system
# - PostgreSQL: Relational database
# - MySQL: Relational database  
# - SQLite: Lightweight database
#
# Relationships:
# (Django) -[IS_FRAMEWORK_FOR]-> (Python)
# (Django) -[USES]-> (ORM)
# (ORM) -[MAPS]-> (Python objects) to (database tables)
# (Django) -[SUPPORTS]-> (PostgreSQL)
# (Django) -[SUPPORTS]-> (MySQL)
# (Django) -[SUPPORTS]-> (SQLite)`,
        },
      },
      {
        id: 'neo4j-implementation',
        title: 'Graph-Based Retrieval with Neo4j',
        level: 2,
        content: `Neo4j is a popular graph database for implementing GraphRAG. It uses the Cypher query language for graph traversal and pattern matching.`,
        code: {
          language: 'python',
          title: 'graphrag_neo4j.py',
          code: `from neo4j import GraphDatabase

driver = GraphDatabase.driver(
    "bolt://localhost:7687", 
    auth=("neo4j", "password")
)

def create_knowledge_graph(session):
    """Build a knowledge graph from extracted entities."""
    session.run("""
        CREATE (python:Technology {name: 'Python', type: 'Language'})
        CREATE (django:Framework {name: 'Django', type: 'Web Framework'})
        CREATE (orm:Component {name: 'Django ORM', type: 'ORM'})
        CREATE (pg:Database {name: 'PostgreSQL', type: 'RDBMS'})
        
        CREATE (django)-[:BUILT_WITH]->(python)
        CREATE (django)-[:INCLUDES]->(orm)
        CREATE (orm)-[:CONNECTS_TO]->(pg)
        CREATE (orm)-[:MAPS {description: 'Python objects to database tables'}]->(pg)
    """)

def graph_retrieval(session, question: str) -> str:
    """Retrieve relevant subgraph for a question."""
    # Extract key entity from question
    entity = extract_key_entity(question)  # e.g., "Django"
    
    # Traverse graph to find related nodes within 2 hops
    result = session.run("""
        MATCH (start {name: $entity})-[r*1..2]-(connected)
        RETURN start.name AS source,
               [rel IN r | type(rel)] AS relationships,
               connected.name AS target,
               connected.type AS target_type
    """, entity=entity)
    
    # Format as context for LLM
    context_parts = []
    for record in result:
        path = f"{record['source']} -> {' -> '.join(record['relationships'])} -> {record['target']} ({record['target_type']})"
        context_parts.append(path)
    
    return "\\n".join(context_parts)

with driver.session() as session:
    context = graph_retrieval(session, "How does Django connect to databases?")
    print(context)
    # Django -> INCLUDES -> Django ORM (ORM)
    # Django ORM -> CONNECTS_TO -> PostgreSQL (RDBMS)
    # Django -> BUILT_WITH -> Python (Language)`,
        },
        callout: { type: 'info', title: 'Microsoft GraphRAG', content: 'Microsoft\'s GraphRAG approach specifically focuses on building hierarchical community summaries from knowledge graphs for global query answering. This is different from generic graph-based RAG, which focuses on entity traversal. Both are valid approaches with different strengths.' },
      },
    ],
    keyTakeaways: [
      'GraphRAG captures entity relationships that vector search misses',
      'Knowledge graphs consist of entities (nodes) and relationships (edges)',
      'Entity extraction can be done with LLMs or specialized NLP models',
      'Neo4j with Cypher enables graph traversal for relationship-aware retrieval',
      'GraphRAG is most valuable for multi-hop reasoning and relationship queries',
      'Microsoft\'s GraphRAG uses community summaries; generic GraphRAG uses entity traversal',
    ],
  },

  'multimodal-rag': {
    slug: 'multimodal-rag',
    title: 'Multimodal RAG',
    description: 'Extend RAG beyond text to handle images, tables, charts, and mixed-media documents.',
    difficulty: 'advanced',
    estimatedMinutes: 30,
    objectives: [
      'Understand the challenges of multimodal document processing',
      'Learn techniques for image, table, and chart extraction',
      'Implement cross-modal retrieval strategies',
      'Combine evidence from multiple modalities',
    ],
    sections: [
      {
        id: 'overview',
        title: 'What is Multimodal RAG?',
        level: 2,
        content: `Multimodal RAG extends the RAG paradigm beyond text to handle documents containing multiple types of content: text, images, tables, charts, diagrams, and other visual elements. Real-world documents rarely contain only text — PDFs include figures, tables, and charts that carry important information.

**Example Scenario**: A user asks a question about a PDF that contains:
- Text paragraphs explaining a concept
- A data table comparing different options
- A chart visualizing performance metrics
- A diagram showing system architecture

A text-only RAG system would miss information encoded in non-text elements. Multimodal RAG processes all these modalities and retrieves the most relevant pieces regardless of type.`,
        diagram: 'multimodal-rag',
        callout: { type: 'warning', title: 'Implementation Complexity', content: 'Multimodal RAG is significantly more complex than text-only RAG. PDF parsing, OCR, vision models, and indexing strategies depend heavily on the document format and chosen implementation. Start with text-only RAG and add modalities incrementally.' },
      },
      {
        id: 'document-parsing',
        title: 'Multimodal Document Parsing',
        level: 2,
        content: `Extracting structured content from complex documents is the foundation of multimodal RAG:

**Text Extraction**: Standard text extraction from PDFs using libraries like PyPDF2, pdfplumber, or unstructured.

**Table Extraction**: Tables require specialized parsing to preserve their structure:
- pdfplumber: Extracts table data as structured arrays
- Camelot: Specialized PDF table extraction
- Unstructured: General-purpose document parsing with table detection
- Vision models: Use GPT-4V or similar models to interpret table screenshots

**Image Extraction**: Extract embedded images from documents:
- PyMuPDF (fitz): Extract images from PDF pages
- pdf2image: Convert PDF pages to images for vision model processing

**Chart/Diagram Interpretation**: Charts and diagrams require vision models:
- GPT-4V: Describe and interpret chart content
- Open-source vision models for on-premise processing

**Layout Analysis**: Understanding the spatial layout of a document page helps associate figures with their captions and relevant text sections.`,
        code: {
          language: 'python',
          title: 'multimodal_parsing.py',
          code: `from unstructured.partition.pdf import partition_pdf

# Parse PDF with table and image extraction
elements = partition_pdf(
    filename="report.pdf",
    strategy="hi_res",           # High-resolution parsing
    extract_images_in_pdf=True,  # Extract embedded images
    infer_table_structure=True,  # Detect and parse tables
)

# Categorize extracted elements
texts = []
tables = []
images = []

for element in elements:
    if element.category == "Table":
        tables.append(element.metadata.text_as_html)  # HTML table
    elif element.category == "Image":
        images.append(element.metadata.image_path)     # Saved image path
    else:
        texts.append(element.text)                     # Text content

print(f"Extracted: {len(texts)} text blocks, {len(tables)} tables, {len(images)} images")`,
        },
      },
      {
        id: 'cross-modal-retrieval',
        title: 'Cross-Modal Retrieval',
        level: 2,
        content: `In multimodal RAG, retrieval must work across different content types. There are several strategies:

**Strategy 1: Text Summaries for All Modalities**
Convert non-text elements to text descriptions, then use standard text embedding and retrieval:
- Tables → text descriptions of key data points
- Images → captions generated by vision models
- Charts → textual summaries of trends and values

This is the simplest approach and works with standard vector databases.

**Strategy 2: Multimodal Embeddings**
Use embedding models that can handle multiple modalities (like CLIP for text and images) to embed all content types into a shared vector space. This enables direct cross-modal similarity search.

**Strategy 3: Separate Indices**
Maintain separate indices for each modality and merge results:
- Text index: standard text embeddings
- Image index: image embeddings or caption embeddings
- Table index: structured data or table description embeddings

Merge results using methods like RRF.`,
        code: {
          language: 'python',
          title: 'multimodal_retrieval.py',
          code: `from langchain_openai import ChatOpenAI

vision_llm = ChatOpenAI(model="gpt-4o", temperature=0)

def summarize_table(table_html: str) -> str:
    """Generate a text summary of a table for embedding."""
    response = vision_llm.invoke(
        f"Summarize the key information in this HTML table in 2-3 sentences. "
        f"Include specific numbers and comparisons:\\n{table_html}"
    )
    return response.content

def describe_image(image_path: str) -> str:
    """Generate a text description of an image for embedding."""
    import base64
    with open(image_path, "rb") as f:
        image_data = base64.b64encode(f.read()).decode()
    
    response = vision_llm.invoke([
        {"type": "text", "text": "Describe this image in detail, including any text, data, or diagrams shown."},
        {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{image_data}"}}
    ])
    return response.content

# Create unified text representations
all_chunks = []
for text in texts:
    all_chunks.append({"content": text, "type": "text"})
for table in tables:
    summary = summarize_table(table)
    all_chunks.append({"content": summary, "type": "table", "raw": table})
for img_path in images:
    description = describe_image(img_path)
    all_chunks.append({"content": description, "type": "image", "path": img_path})

# Now embed and store all chunks uniformly
# Retrieval works the same as text-only RAG`,
        },
      },
      {
        id: 'combining-evidence',
        title: 'Combining Multimodal Evidence',
        level: 2,
        content: `When generating the final answer, the LLM needs context from multiple modalities. How you present this context matters:

**Text Context**: Include directly in the prompt as usual.

**Table Context**: Include the original HTML/markdown table along with its summary. LLMs can interpret tabular data when it's well-formatted.

**Image Context**: For text-based LLMs, include the generated description. For vision-capable LLMs (like GPT-4o), you can include the actual image alongside text.

**Practical Considerations:**
- Vision model API calls add latency and cost
- Image quality affects vision model accuracy
- OCR may be needed for scanned documents
- Table structure preservation is critical for accuracy
- Not all PDFs are created equal — some are well-structured, others are scanned images`,
      },
    ],
    keyTakeaways: [
      'Multimodal RAG handles text, images, tables, and charts from mixed-media documents',
      'Document parsing is the critical first step — quality of extraction determines everything',
      'Converting all modalities to text descriptions enables use of standard vector search',
      'Multimodal embeddings (like CLIP) enable direct cross-modal retrieval',
      'Start with text-only RAG and add modalities incrementally as needed',
      'PDF parsing, OCR, and vision model capabilities vary by document type',
    ],
  },
};

export function getLessonData(slug: string): LessonData | null {
  return lessons[slug] || null;
}
